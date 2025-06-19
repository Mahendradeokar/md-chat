import { makeUseQueryWithStatus } from "convex-helpers/react";
import { useQueries } from "convex-helpers/react/cache/hooks";
import { useConvexAuth, type OptionalRestArgsOrSkip } from "convex/react";
import type { FunctionReference } from "convex/server";

const useQueryHook = makeUseQueryWithStatus(useQueries);

export function useQueryWithStatus<Query extends FunctionReference<"query">>(
  query: Query,
  args: OptionalRestArgsOrSkip<Query>[0] | "skip",
) {
  const { isAuthenticated } = useConvexAuth();

  return useQueryHook(query, isAuthenticated ? args : "skip");
}
