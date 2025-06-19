import { getAuthUserId } from "@convex-dev/auth/server";
import { type MutationCtx, type QueryCtx } from "../_generated/server";
import { ERROR_CODE } from "../../src/constants/error-codes";
import { ConvexError } from "convex/values";

class UserModel {
  async ensureUserIdExists(ctx: QueryCtx | MutationCtx) {
    const userId = await getAuthUserId(ctx);

    if (!userId) throw new ConvexError(ERROR_CODE.UN_AUTHENTICATED);

    return userId;
  }
}

const User = new UserModel();

export default User;
