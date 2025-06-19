/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as apiKeys from "../apiKeys.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as lib_utils from "../lib/utils.js";
import type * as messages from "../messages.js";
import type * as model_ApiKeys from "../model/ApiKeys.js";
import type * as model_Message from "../model/Message.js";
import type * as model_Thread from "../model/Thread.js";
import type * as model_Users from "../model/Users.js";
import type * as thread from "../thread.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  apiKeys: typeof apiKeys;
  auth: typeof auth;
  http: typeof http;
  "lib/utils": typeof lib_utils;
  messages: typeof messages;
  "model/ApiKeys": typeof model_ApiKeys;
  "model/Message": typeof model_Message;
  "model/Thread": typeof model_Thread;
  "model/Users": typeof model_Users;
  thread: typeof thread;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
