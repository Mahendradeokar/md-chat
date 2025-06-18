import { type ZodError } from "zod";

export function formatZodErrors(error: ZodError) {
  const flattenedErrors = error.flatten();

  const fieldErrors =
    Object.entries(flattenedErrors.fieldErrors)
      .filter(([_, messages]) => messages?.length)
      .map(([field, messages]) => `${field}: ${messages!.join(", ")}`) ?? [];

  const formErrors = flattenedErrors.formErrors.length
    ? flattenedErrors.formErrors
    : [];

  const allErrors = [...fieldErrors, ...formErrors];

  const stringConversation = allErrors.length
    ? allErrors.join("; ")
    : "Validation failed with unknown errors";

  return [
    stringConversation,
    {
      formErrors: formErrors,
      fieldErrors: fieldErrors,
    },
  ] as const;
}
