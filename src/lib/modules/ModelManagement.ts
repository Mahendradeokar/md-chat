import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { type groq as groqProvider, createGroq } from "@ai-sdk/groq";

export interface ModelProvider {
  getModel(modelId: string): unknown;
}

/**
 * @deprecated: Not using now - Directly using the Vercel AI SDK.
 */

export class OpenRouterModelProvider implements ModelProvider {
  private provider: ReturnType<typeof createOpenRouter>;

  constructor(apiKey?: string) {
    this.provider = createOpenRouter({
      apiKey: String(apiKey ?? process.env.OPEN_ROUTER_KEY ?? ""),
    });
  }

  getModel(modelId: string): unknown {
    if (!modelId) throw new Error("modelId is required");
    const cleanId = modelId.replace(/^openrouter:/, "");
    return this.provider(cleanId);
  }
}

export class GroqModelProvider implements ModelProvider {
  private provider: typeof groqProvider;

  constructor(apiKey?: string) {
    this.provider = createGroq({
      apiKey: String(apiKey ?? process.env.GROQ_API_KEY ?? ""),
    });
  }

  getModel(modelId: string): unknown {
    if (!modelId) throw new Error("modelId is required");
    const cleanId = modelId.replace(/^groq:/, "");
    return this.provider(cleanId);
  }
}

type ProviderFactory = (apiKey?: string) => ModelProvider;

export class ModelProviderManager {
  private providers = new Map<string, ProviderFactory>();

  constructor() {
    this.registerProvider(
      "openrouter",
      (apiKey?: string) => new OpenRouterModelProvider(apiKey),
    );
    this.registerProvider(
      "groq",
      (apiKey?: string) => new GroqModelProvider(apiKey),
    );
  }

  public registerProvider(prefix: string, factory: ProviderFactory): void {
    this.providers.set(prefix, factory);
  }

  public getModel(modelId: `${string}:${string}`, apiKey?: string): unknown {
    if (!modelId) throw new Error("modelId is required");
    const [prefix] = modelId.split(":");
    if (!prefix) {
      throw new Error("Unknown provider");
    }
    const factory = this.providers.get(prefix);
    if (!factory) {
      throw new Error(`Unknown model provider for id: ${modelId}`);
    }
    return factory(apiKey).getModel(modelId);
  }

  static createModelId(provider: string, modelId: string) {
    return `${provider}=${modelId}`;
  }

  static separateProviderModelId(modelId: string): [string, string] | [] {
    if (modelId.includes("=")) {
      return modelId.split("=") as [string, string];
    }
    return [];
  }
}
