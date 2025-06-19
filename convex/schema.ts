import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { zodToConvex } from "convex-helpers/server/zod";
import { messageSchema } from "./model/Message";
import { threadSchema } from "./model/Thread";
import { apiKeysSchema } from "./model/ApiKeys";

const schema = defineSchema({
  ...authTables,
  threads: defineTable(zodToConvex(threadSchema))
    .index("by_user_id", ["userId"])
    .index("by_thread_id", ["threadId"]),
  messages: defineTable(zodToConvex(messageSchema))
    .index("by_thread_id", ["threadId"])
    .index("by_message_id", ["messageId"]),
  apiKeys: defineTable(zodToConvex(apiKeysSchema)).index("by_user_id", [
    "userId",
  ]),
});

export default schema;
