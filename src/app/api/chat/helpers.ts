import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "~/../convex/_generated/api";
import type { messageSchema } from "convex/model/Message";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { z } from "zod";
import { generateUniqId, tryCatch } from "~/lib/utils";
import { ERROR_CODE } from "~/constants/error-codes";
import { AVAILABLE_MODEL_IDS } from "~/constants";

export const payloadSchema = z.object({
  messages: z
    .array(
      z.object({
        id: z.string().optional(),
        content: z.string(),
        role: z.enum(["user", "assistant"]),
      }),
    )
    .min(1, "Messages array cannot be empty"),
  id: z.string(),
  modelId: z.enum(AVAILABLE_MODEL_IDS as [string, ...string[]]),
});

export type Payload = z.infer<typeof payloadSchema>;

export const ensureTheadCreated = async (id: Payload["id"]) => {
  const result = await tryCatch(
    fetchMutation(
      api.thread.createThread,
      { threadId: id },
      { token: await convexAuthNextjsToken() },
    ),
  );

  if (result.error) {
    return Response.json(
      { error: result.error.message },
      {
        status: 400,
        statusText: "Bad Request",
      },
    );
  }

  return null;
};

export const addUserMessage = async (
  threadId: string,
  lastMessage: { id?: string; content: string },
  options: { token: string | undefined },
) => {
  return fetchMutation(
    api.messages.createMessage,
    {
      threadId,
      messageId: lastMessage.id ?? generateUniqId(),
      content: lastMessage.content,
      role: "user",
    },
    { token: options.token },
  );
};

export const addAssistantMessage = async (
  message: Omit<z.infer<typeof messageSchema>, "userId"> & {
    role: "assistant";
  },
  options: { token: string | undefined },
) => {
  return fetchMutation(
    api.messages.createMessage,
    {
      ...message,
    },
    { token: options.token },
  );
};

export const getUserProviderKey = async (
  provider: string,
  options: {
    token: string | undefined;
  },
) => {
  const result = await tryCatch(
    fetchQuery(
      api.apiKeys.getApiKeys,
      {},
      {
        token: options.token,
      },
    ),
  );

  console.log("KEY", result)
  if (result.error || !result.data) {
    throw new Error(ERROR_CODE.NOT_FOUND);
  }

  if (!result.data?.[provider]) {
    throw new Error(ERROR_CODE.NOT_FOUND);
  }

  return result.data?.[provider];
};

export const sanitizeUserQuery = (query: string): string => {
  const sanitized = query.trim().replace(/\s+/g, " ");
  const MAX_LENGTH = 200;

  if (sanitized.length > MAX_LENGTH) {
    return `${sanitized.slice(0, MAX_LENGTH)}... (truncated)`;
  }

  return sanitized;
};
