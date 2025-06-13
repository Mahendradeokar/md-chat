import { getOrigin } from "~/lib/utils";

export const ROUTES_URL = {
  AUTH: "/auth",
  conversation: "conversation/:id",
  COSMIC: "cosmic",
  SETTINGS: "/settings",
  SHOWCASE: "/showcase",
  CHAT: "/"
}

export const GOOGLE_AUTH_CALLBACK_URL = URL.parse(ROUTES_URL.CHAT, getOrigin())?.toString()