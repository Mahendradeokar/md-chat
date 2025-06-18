import {
  createDataStreamResponse,
  generateText,
  streamText,
  type JSONValue,
} from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { AVAILABLE_MODELS, SSE_EVENTS } from "~/constants";
import { after } from "next/server";
import { createLogger } from "~/lib/modules/Logger";
import { formatZodErrors } from "~/lib/zod-error";
import {
  addAssistantMessage,
  addUserMessage,
  ensureTheadCreated,
  payloadSchema,
} from "./helpers";
import type { ThreadCreatedEvent } from "~/shared-types/SSE";
import { tryCatch } from "~/lib/utils";
import promptLoader from "~/prompts/PromptLoader";
import { fetchMutation } from "convex/nextjs";
import { api } from "convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { getMockChatModel, getMockTitleModel } from "./mock";

const titleGenerationPrompt = promptLoader.getPromptById("TITLE_GENERATOR");

export const maxDuration = 60;
const logger = createLogger("CHAT_API");

const openRouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_KEY,
});

const sanitizeUserQuery = (query: string): string => {
  const sanitized = query.trim().replace(/\s+/g, " ");
  const MAX_LENGTH = 200;

  if (sanitized.length > MAX_LENGTH) {
    return `${sanitized.slice(0, MAX_LENGTH)}... (truncated)`;
  }

  return sanitized;
};

const getTitleCreationPromise = async ({
  threadId,
  userQuery,
  token,
}: {
  threadId: string;
  userQuery: string;
  token: string | undefined;
}) => {
  const sanitizedQuery = sanitizeUserQuery(userQuery);

  const result = await tryCatch(
    generateText({
      // model: openRouter(AVAILABLE_MODELS.META_LLAMA_3_3_B_INSTRUCT.id),
      model: getMockTitleModel(),
      maxTokens: 20,
      system: titleGenerationPrompt.content,
      maxRetries: 2,
      prompt: sanitizedQuery,
    }),
  );

  logger.debug("TITLE RESULT", JSON.stringify(result, null, 2));
  if (result.error) {
    logger.error("TITLE_CREATE", result.error?.message);
    return null;
  }

  const { text } = result.data;

  return fetchMutation(
    api.thread.updateThread,
    {
      threadId: threadId,
      title: text,
    },
    {
      token: token,
    },
  );
};

export async function POST(req: Request) {
  const body = (await req.json()) as unknown;
  // console.log(JSON.stringify(body, null, 2));

  const validationResult = payloadSchema.safeParse(body);
  if (!validationResult.success) {
    const [errorString, { fieldErrors, formErrors }] = formatZodErrors(
      validationResult.error,
    );
    logger.debug(
      "validation",
      JSON.stringify(formatZodErrors(validationResult.error), null, 2),
    );
    return Response.json(
      { error: errorString, data: { formErrors, fieldErrors } },
      { status: 400, statusText: "Bad Request" },
    );
  }

  const { messages, id: threadId } = validationResult.data;
  const userAuthToken = await convexAuthNextjsToken();

  const errorResponse = await ensureTheadCreated(threadId);
  if (errorResponse) {
    return errorResponse;
  }

  const lastMessage = messages[messages.length - 1]!;
  const addUserMessagePromise = addUserMessage(threadId, lastMessage, {
    token: userAuthToken,
  });

  const titleCreationPromise = getTitleCreationPromise({
    threadId,
    userQuery: lastMessage.content,
    token: userAuthToken,
  });

  return createDataStreamResponse({
    execute: async (dataStream) => {
      const threadCreatedEvent: ThreadCreatedEvent = {
        type: SSE_EVENTS.THREAD_CREATED,
        data: {
          threadId: threadId,
        },
      };
      dataStream.writeData(threadCreatedEvent as unknown as JSONValue);

      const result = streamText({
        model: openRouter(AVAILABLE_MODELS.META_LLAMA_3_3_B_INSTRUCT.id),
        // model: getMockChatModel(),
        maxTokens: 10000,
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistance.",
          },
          ...messages,
        ],
        onChunk: (chunks) => {
          logger.debug("CHUCKS", chunks);
        },
        // onError: ({ error }) => {
        //   const modelFailedEvent: AIModelFailedEvent = {
        //     type: SSE_EVENTS.AI_MODEL_FAILED,
        //     data: {
        //       error: isProduction()
        //         ? "Failed to fulfill the request. Please try again later."
        //         : JSON.stringify(error, null, 2),
        //     },
        //   };
        //   dataStream.writeData(modelFailedEvent as unknown as JSONValue);
        // },
      });

      void result.consumeStream();

      after(async () => {
        logger.debug("After is called");
        const { text, finishReason, reasoning, response, providerMetadata } =
          result;

        const resultResponse = await tryCatch(
          Promise.all([
            response,
            text,
            finishReason,
            providerMetadata,
            reasoning,
          ]),
        );

        if (resultResponse.error) {
          logger.error(
            "Error getting result data:",
            resultResponse.error?.message,
          );
          return;
        }

        const [res, content, fReason, providerData, reasoningContent] =
          resultResponse.data;

        const assistanceMessagePromise = addAssistantMessage(
          {
            role: "assistant",
            content: content,
            messageId: res.id,
            threadId: threadId,
            finishReason: fReason,
            isGenerationCompleted: fReason !== undefined && fReason !== null,
            model: res.modelId,
            providerMetadata: providerData,
            reasoningContent: reasoningContent,
          },
          {
            token: userAuthToken,
          },
        );

        const dbResponse = await tryCatch(
          Promise.all([
            addUserMessagePromise,
            assistanceMessagePromise,
            titleCreationPromise,
          ]),
        );

        if (dbResponse.error) {
          logger.error("Error saving messages:", dbResponse.error?.message);
        }
      });

      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => {
      logger.error("[ERROR_API]", error);
      return error instanceof Error ? error.message : String(error);
    },
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
