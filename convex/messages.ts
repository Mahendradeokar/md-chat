import { zid, zMutation, zQuery } from "./lib/utils";
import User from "./model/Users";
import Message, { messageSchema } from "./model/Message";
import { ERROR_CODE } from "../src/constants/error-codes";
import { z } from "zod";
import { ConvexError } from "convex/values";

export const updateMessage = zMutation({
  args: messageSchema
    .extend({
      _id: zid("messages"),
    })
    .partial(),
  handler: async (ctx, message) => {
    const userId = await User.ensureUserIdExists(ctx);

    const existingMessage = await Message.getMessageDetails(ctx, {
      _id: message._id!,
    });

    if (existingMessage) {
      if (existingMessage.userId !== userId) {
        throw new ConvexError(ERROR_CODE.UN_AUTHORIZED);
      }

      return await ctx.db.patch(message._id!, message);
    }

    throw new ConvexError(ERROR_CODE.NOT_FOUND);
  },
});

export const createMessage = zMutation({
  args: messageSchema.extend({
    userId: messageSchema.shape.userId.optional(),
  }),
  handler: async (ctx, message) => {
    const userId = await User.ensureUserIdExists(ctx);

    // Check if message with same ID already exists
    const existingMessageId = await Message.isMessageAlreadyExists(ctx, {
      messageId: message.messageId,
    });

    if (existingMessageId) {
      throw new ConvexError(ERROR_CODE.DUPLICATE_RESOURCE);
    }

    // Create new message
    return await ctx.db.insert("messages", {
      ...message,
      userId,
    });
  },
});

export const getMessages = zQuery({
  args: z.object({
    threadId: z.string(),
  }),
  handler: async (ctx, args) => {
    await User.ensureUserIdExists(ctx);
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .order("asc")
      .collect();
    return messages;
  },
});
