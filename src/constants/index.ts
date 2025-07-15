import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import {
  AnthropicIcon,
  DeepseekIcon,
  GeminiIcon,
  MetaIcon,
  OpenAIIcon,
  SarvamIcon,
} from "~/components/shared";

export const ROUTES_URL = {
  AUTH: "/auth",
  CONVERSATION: "conversation/:id",
  COSMIC: "cosmic",
  SETTINGS: "/settings",
  SHOWCASE: "/showcase",
  CHAT: "/",
};

export const AVAILABLE_MODELS = {
  GOOGLE_GEMINI_2_5_FLASH_PREVIEW_05_20: {
    id: "google/gemini-2.5-flash-preview-05-20",
    name: "Gemini 2.5 Flash",
    icon: GeminiIcon,
  },
  GOOGLE_GEMINI_2_5_PRO_PREVIEW_06_05: {
    id: "google/gemini-2.5-pro-preview",
    name: "Gemini 2.5 Pro",
    icon: GeminiIcon,
  },
  GOOGLE_GEMINI_2_0_FLASH: {
    id: "google/gemini-2.0-flash-001",
    name: "Gemini 2.0 Flash",
    icon: GeminiIcon,
  },
  GOOGLE_GEMINI_2_0_FLASH_LITE: {
    id: "google/gemini-2.0-flash-lite-001",
    name: "Gemini 2.0 Flash Lite",
    icon: GeminiIcon,
  },
  GOOGLE_GEMINI_2_5_FLASH_LITE_PREVIEW_06_17: {
    id: "google/gemini-2.5-flash-lite-preview-06-17",
    name: "Gemini 2.5 Flash Lite",
    icon: GeminiIcon,
  },
  OPENAI_GPT_4_1: {
    id: "openai/gpt-4.1",
    name: "GPT-4.1",
    icon: OpenAIIcon,
  },
  OPENAI_GPT_4_1_MINI: {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    icon: OpenAIIcon,
  },
  OPENAI_GPT_4_1_NANO: {
    id: "openai/gpt-4.1-nano",
    name: "GPT-4.1 Nano",
    icon: OpenAIIcon,
  },
  OPENAI_O3_MINI: {
    id: "openai/o3-mini",
    name: "o3 Mini",
    icon: OpenAIIcon,
  },
  ANTHROPIC_CLAUDE_3_7_SONNET: {
    id: "anthropic/claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    icon: AnthropicIcon,
  },
  ANTHROPIC_CLAUDE_SONNET_4: {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    icon: AnthropicIcon,
  },
  DEEPSEEK_R1_0528_FREE: {
    id: "deepseek/deepseek-r1-0528:free",
    name: "DeepSeek R1",
    icon: DeepseekIcon,
  },
  DEEPSEEK_V3_0324_FREE: {
    id: "deepseek/deepseek-chat-v3-0324:free",
    name: "DeepSeek V3",
    icon: DeepseekIcon,
  },
  META_LLAMA_3_3_70B_INSTRUCT: {
    id: "meta-llama/llama-3.3-70b-instruct",
    name: "Llama 3.3 70B Instruct",
    icon: MetaIcon,
  },
  META_LLAMA_4_MAVERICK: {
    id: "meta-llama/llama-4-maverick",
    name: "Llama 4 Maverick",
    icon: MetaIcon,
  },
  META_LLAMA_4_SCOUT: {
    id: "meta-llama/llama-4-scout",
    name: "Llama 4 Scout",
    icon: MetaIcon,
  },
  META_LLAMA_3_2_3B_INSTRUCT_FREE: {
    id: "meta-llama/llama-3.2-3b-instruct:free",
    name: "Llama 3.2 3B Instruct (Free)",
    icon: MetaIcon,
  },
  SARVAMAI_SARVAM_M_FREE: {
    id: "sarvamai/sarvam-m:free",
    name: "Sarvam-M",
    icon: SarvamIcon,
  },
  AUTO: {
    id: "openrouter/auto",
    name: "Auto",
    icon: Sparkles,
    default: true,
  },
};

export function getDefaultModel(): { id: string; name: string } {
  return (
    Object.values(AVAILABLE_MODELS).find(
      (model) => "default" in model && model.default,
    ) ?? Object.values(AVAILABLE_MODELS)[0]!
  );
}

export const PROVIDERS = {
  OPENROUTER: "openRouter", // in apikeys.ts have added as static.
} as const;

export const AVAILABLE_MODELS_LIST = Object.values(AVAILABLE_MODELS);

export const AVAILABLE_MODEL_IDS = Object.values(AVAILABLE_MODELS).map(
  (m) => m.id,
);

export const SSE_EVENTS = {
  THREAD_CREATED: "thread_created",
  AI_MODEL_FAILED: "ai_model_failed",
} as const;
