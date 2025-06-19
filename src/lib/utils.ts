import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v7 as uuidv7, validate as uuidValidate } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOrigin = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
};

export const generateUniqId = () => {
  return uuidv7();
};
generateUniqId.isValid = uuidValidate;

type Result<T> = { data: T; error?: never } | { data?: never; error: Error };

export async function tryCatch<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const data = await promise;
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

export const isProduction = () => process.env.NODE_ENV === "production";

export const appendIdInUrl = (route: string, id?: string, paramName = "id") => {
  if (!id) return route;
  return route.replace(`:${paramName}`, id);
};
