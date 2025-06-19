import { z } from "zod";
import { type MutationCtx, type QueryCtx } from "../_generated/server";
import { zid } from "convex-helpers/server/zod";
import User from "./Users";
import { type Id } from "../_generated/dataModel";

export const apiKeysSchema = z.object({
  provider: z.record(z.string(), z.string()),
  userId: zid("users"),
});

export type ApiKeys = z.infer<typeof apiKeysSchema>;

class APIKeysModel {
  async getUserApiKeys(
    ctx: QueryCtx | MutationCtx,
    options: { userId: Id<"users"> },
  ) {
    const userId = options.userId ?? (await User.ensureUserIdExists(ctx));
    return ctx.db
      .query("apiKeys")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();
  }
}

const APIKey = new APIKeysModel();
export default APIKey;
