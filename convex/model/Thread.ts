import { type MutationCtx, type QueryCtx } from "../_generated/server";
import { z } from "zod";
import { zid } from "convex-helpers/server/zod";
import { createLogger } from "../../src/lib/modules/Logger";
import { ERROR_CODE } from "../../src/constants";

const logger = createLogger("CONVEX_THREAD_MODEL");

export const threadSchema = z.object({
  threadId: z.string(),
  userId: zid("users"),
  title: z.string(),
});

class ThreadModel {
  async isThreadAlreadyExits(
    ctx: QueryCtx | MutationCtx,
    payload: { threadId: string },
  ) {
    try {
      const results = await ctx.db
        .query("threads")
        .withIndex("by_thread_id", (q) => q.eq("threadId", payload.threadId))
        .unique();

      if (results) {
        return results.threadId;
      }
    } catch (error) {
      logger.error("is thread already exists", (error as Error)?.message);
      throw error;
    }
  }

  async getThreadById(
    ctx: QueryCtx | MutationCtx,
    payload: { threadId: string },
  ) {
    try {
      const thread = await ctx.db
        .query("threads")
        .withIndex("by_thread_id", (q) => q.eq("threadId", payload.threadId))
        .unique();

      if (!thread) {
        throw new Error(ERROR_CODE.NOT_FOUND);
      }

      return thread;
    } catch (error) {
      logger.error("get thread by id", (error as Error)?.message);
      throw error;
    }
  }
}

const Thread = new ThreadModel();

export default Thread;
