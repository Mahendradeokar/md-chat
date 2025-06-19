import { useQueryWithStatus } from "./use-query-with-status";
import { api } from "~/../convex/_generated/api";

function getFirstLastName(name?: string) {
  const [first, ...rest] = name?.trim().split(/\s+/) ?? [];
  return {
    firstName: first,
    lastName: rest.length > 0 ? rest.join(" ") : undefined,
  };
}

export function useUser() {
  const { data, ...rest } = useQueryWithStatus(api.user.getCurrentUser, {});
  return {
    user: {
      ...(data ?? {}),
      ...getFirstLastName(data?.name),
    },
    ...rest,
  };
}
