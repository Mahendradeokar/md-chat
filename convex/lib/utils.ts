import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomQuery, zid, zCustomMutation } from "convex-helpers/server/zod";
import { internalMutation, mutation, query } from "../_generated/server";

export const zQuery = zCustomQuery(query, NoOp);
export const zMutation = zCustomMutation(mutation, NoOp);
export const zInternalMutation = zCustomMutation(internalMutation, NoOp);
export { zid };
