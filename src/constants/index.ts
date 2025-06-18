export * from "./error-codes";

export const ROUTES_URL = {
  AUTH: "/auth",
  CONVERSATION: "conversation/:id",
  COSMIC: "cosmic",
  SETTINGS: "/settings",
  SHOWCASE: "/showcase",
  CHAT: "/",
};

export const AVAILABLE_MODELS = {
  DEEPSEEK_R1_QWEN_3: {
    id: "deepseek/deepseek-r1-0528-qwen3-8b:free",
  },
  META_LLAMA_3_3_B_INSTRUCT: {
    id: "meta-llama/llama-3.3-8b-instruct:free",
  },
};

export const SSE_EVENTS = {
  THREAD_CREATED: "thread_created",
  AI_MODEL_FAILED: "ai_model_failed",
} as const;
