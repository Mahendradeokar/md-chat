import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "~/../convex/_generated/api";
import type { messageSchema } from "convex/model/Message";
import { fetchMutation } from "convex/nextjs";
import { z } from "zod";
import { generateUniqId, tryCatch } from "~/lib/utils";

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
