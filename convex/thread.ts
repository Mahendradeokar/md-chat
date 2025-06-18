import { z } from "zod";
import { zMutation, zQuery } from "./lib/utils";
import User from "./model/Users";
import Thread, { threadSchema } from "./model/Thread";

export const createThread = zMutation({
  args: {
    threadId: z.string(),
  },
  handler: async (ctx, { threadId }) => {
    const userId = await User.ensureUserIdExists(ctx);

    const isThreadExists = await Thread.isThreadAlreadyExits(ctx, {
      threadId: threadId,
    });

    if (isThreadExists) {
      return;
    }
    await ctx.db.insert("threads", {
      threadId: threadId,
      userId: userId,
      title: "New Conversation",
    });
  },
});

export const updateThread = zMutation({
  args: threadSchema.partial().extend({
    threadId: threadSchema.shape.threadId,
  }),
  handler: async (ctx, { threadId, ...restUpdate }) => {
    const userId = await User.ensureUserIdExists(ctx);

    const thread = await Thread.getThreadById(ctx, { threadId });

    if (!thread) {
      throw new Error("Thread not found");
    }

    if (thread.userId !== userId) {
      throw new Error("Unauthorized: You can only update your own threads");
    }

    await ctx.db.patch(thread._id, { ...restUpdate });
  },
});

export const getThreads = zQuery({
  handler: async (ctx) => {
    const userId = await User.ensureUserIdExists(ctx);
    const userThreads = await ctx.db
      .query("threads")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    return userThreads;
  },
});
