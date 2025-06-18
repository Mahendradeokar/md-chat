import { type MutationCtx, type QueryCtx } from "../_generated/server";
import { z } from "zod";
import { type Id } from "../_generated/dataModel";
import { zid } from "convex-helpers/server/zod";
import { createLogger } from "../../src/lib/modules/Logger";

const logger = createLogger("CONVEX_MESSAGE_MODEL");

export const messageSchema = z.object({
  threadId: z.string(),
  messageId: z.string(),
  content: z.string(),
  role: z.enum(["user", "assistant"]),
  reasoningContent: z.string().optional(),
  userId: zid("users"),
  finishReason: z
    .enum([
      "stop",
      "length",
      "content-filter",
      "tool-calls",
      "error",
      "other",
      "unknown",
    ])
    .optional(),
  isGenerationCompleted: z.boolean().optional(),
  model: z.string().optional(),
  providerMetadata: z
    .record(z.string(), z.record(z.string(), z.any()))
    .optional(),
});

class MessageModel {
  async isMessageAlreadyExists(
    ctx: QueryCtx | MutationCtx,
    payload: { messageId: string },
  ) {
    try {
      const results = await ctx.db
        .query("messages")
        .withIndex("by_message_id", (q) => q.eq("messageId", payload.messageId))
        .unique();

      if (results) {
        return results.messageId;
      }
    } catch (error) {
      logger.error("is message already exists", (error as Error)?.message);
      throw error;
    }
  }

  getMessageDetails(
    ctx: QueryCtx | MutationCtx,
    { _id }: { _id: Id<"messages"> },
  ) {
    return ctx.db
      .query("messages")
      .withIndex("by_id", (q) => q.eq("_id", _id))
      .unique();
  }
}

const Message = new MessageModel();

export default Message;
