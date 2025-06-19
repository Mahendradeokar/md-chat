import { ConvexError } from "convex/values";
import { zQuery } from "./lib/utils";
import User from "./model/Users";

export const getCurrentUser = zQuery({
  handler: async (ctx) => {
    const userId = await User.ensureUserIdExists(ctx);

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new ConvexError("User not found");
    }

    return {
      name: user.name,
      email: user.email,
      image: user.image,
    };
  },
});
