import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ROUTES_URL } from "~/constants";
import { ERROR_CODE } from "~/constants/error-codes";

export const useMutationWithAuth = (...arg: Parameters<typeof useMutation>) => {
  const mutationFn = useMutation(...arg);
  const router = useRouter();

  return useCallback(
    (...arg: Parameters<typeof mutationFn>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return mutationFn(...arg).catch((err: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (err?.data === ERROR_CODE.UN_AUTHENTICATED) {
          router.replace(ROUTES_URL.AUTH);
          // TODO: Should forcefully push the to url. And next operation should not be get perform.
          // Currant there will be some delay due to nextjs router handling the replace.
          //  it's next error handling code will get executed. Which should not be
        }
        throw err;
      });
    },
    [mutationFn, router],
  );
};
