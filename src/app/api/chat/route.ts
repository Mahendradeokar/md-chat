import {
  APICallError,
  createDataStreamResponse,
  generateText,
  streamText,
  type JSONValue,
} from "ai";
import {
  createOpenRouter,
  type OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import { AVAILABLE_MODELS, PROVIDERS, SSE_EVENTS } from "~/constants";
import { after } from "next/server";
import { createLogger } from "~/lib/modules/Logger";
import { formatZodErrors } from "~/lib/zod-error";
import {
  addAssistantMessage,
  addUserMessage,
  ensureTheadCreated,
  getUserProviderKey,
  payloadSchema,
  sanitizeUserQuery,
} from "./helpers";
import type { ThreadCreatedEvent } from "~/shared-types/SSE";
import { tryCatch } from "~/lib/utils";
import promptLoader from "~/prompts/PromptLoader";
import { fetchMutation } from "convex/nextjs";
import { api } from "~/../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
// import { getMockTitleModel } from "./mock";

const titleGenerationPrompt = promptLoader.getPromptById("TITLE_GENERATOR");

export const maxDuration = 60;
const logger = createLogger("CHAT_API");

const getTitleCreationPromise = async ({
  threadId,
  userQuery,
  token,
  modelProvider,
}: {
  threadId: string;
  userQuery: string;
  token: string | undefined;
  modelProvider: OpenRouterProvider;
}) => {
  const sanitizedQuery = sanitizeUserQuery(userQuery);

  const result = await tryCatch(
    generateText({
      model: modelProvider(AVAILABLE_MODELS.AUTO.id),
      // model: getMockTitleModel(),
      maxTokens: 20,
      system: titleGenerationPrompt.content,
      maxRetries: 2,
      prompt: sanitizedQuery,
    }),
  );

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

  const validationResult = payloadSchema.safeParse(body);
  if (!validationResult.success) {
    const [errorString, { fieldErrors, formErrors }] = formatZodErrors(
      validationResult.error,
    );
    return Response.json(
      { error: errorString, data: { formErrors, fieldErrors } },
      { status: 400, statusText: "Bad Request" },
    );
  }

  const { messages, id: threadId, modelId } = validationResult.data;
  const userAuthToken = await convexAuthNextjsToken();

  const isFirstMessage = messages?.length === 1;
  if (isFirstMessage) {
    const errorResponse = await ensureTheadCreated(threadId);
    if (errorResponse) {
      return errorResponse;
    }
  }

  const { data: providerKey } = await tryCatch(
    getUserProviderKey(PROVIDERS.OPENROUTER, {
      token: userAuthToken,
    }),
  );

  const openRouterInstance = createOpenRouter({
    apiKey: providerKey ?? process.env.OPEN_ROUTER_KEY,
  });

  const lastMessage = messages[messages.length - 1]!;
  const addUserMessagePromise = addUserMessage(threadId, lastMessage, {
    token: userAuthToken,
  });

  const titleCreationPromise = isFirstMessage
    ? getTitleCreationPromise({
        threadId,
        userQuery: lastMessage.content,
        token: userAuthToken,
        modelProvider: openRouterInstance,
      })
    : Promise.resolve(null);

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
        model: openRouterInstance(modelId, {
          reasoning: {
            exclude: true,
            max_tokens: 0,
          },
        }),
        // model: getMockChatModel(),
        maxTokens: 10000,
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistance.",
          },
          ...messages,
        ],
        // onChunk: (chunks) => {
        //   logger.debug("CHUCKS", chunks);
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
      if (APICallError.isInstance(error) && error.statusCode === 401) {
        return "Unable to call the API with your API key. Please check your API key or add a new one.";
      }
      return error instanceof Error ? error.message : String(error);
    },
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
