import { z } from "zod";
import { zQuery, zMutation } from "./lib/utils";
import User from "./model/Users";
import APIKey from "./model/ApiKeys";

export const getApiKeys = zQuery({
  handler: async (ctx) => {
    const userId = await User.ensureUserIdExists(ctx);
    const apiKeys = await APIKey.getUserApiKeys(ctx, { userId: userId });
    return apiKeys?.provider ?? null;
  },
});

export const isApiKeysConfigured = zQuery({
  handler: async (ctx) => {
    const userId = await User.ensureUserIdExists(ctx);

    const apiKeys = await APIKey.getUserApiKeys(ctx, { userId: userId });
    return Boolean(Object.values(apiKeys?.provider ?? {}).length);
  },
});

export const updateApiKeys = zMutation({
  args: {
    provider: z.string().optional(),
    key: z.string(),
  },
  handler: async (ctx, { provider, key }) => {
    const userId = await User.ensureUserIdExists(ctx);

    const existingApiKeys = await ctx.db
      .query("apiKeys")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    const providerId = provider ?? "openRouter";

    if (existingApiKeys) {
      await ctx.db.patch(existingApiKeys._id, {
        provider: {
          ...existingApiKeys.provider,
          [providerId]: key,
        },
      });
    } else {
      await ctx.db.insert("apiKeys", {
        provider: {
          [providerId]: key,
        },
        userId,
      });
    }

    return { success: true };
  },
});
