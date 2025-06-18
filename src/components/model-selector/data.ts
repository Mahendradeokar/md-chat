import { type Provider, type Model } from "./types";

export const PROVIDERS: Provider[] = [
  {
    id: "openrouter",
    name: "OpenRouter",
    description: "Access to multiple AI models",
  },
  {
    id: "qroq",
    name: "Qroq",
    description: "Fast and reliable AI models",
  },
];

export const MODELS: Record<string, Model[]> = {
  openrouter: [
    { id: "gpt-4", name: "GPT-4", description: "Most capable model" },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      description: "Fast and efficient",
    },
    {
      id: "claude-3",
      name: "Claude 3",
      description: "Anthropic's latest model",
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      description: "Google's advanced model",
    },
  ],
  qroq: [
    { id: "qroq-fast", name: "Qroq Fast", description: "Ultra-fast responses" },
    { id: "qroq-pro", name: "Qroq Pro", description: "High-quality responses" },
    {
      id: "qroq-ultra",
      name: "Qroq Ultra",
      description: "Best quality available",
    },
  ],
};
