import { type ModelStatus } from "./types";
import { MODELS } from "./data";

export const getSelectedModelName = (selectedModel?: string): string => {
  if (!selectedModel) return "Select Model";

  // Find the model name from our static data
  for (const provider of Object.values(MODELS)) {
    const model = provider.find((m) => m.id === selectedModel);
    if (model) return model.name;
  }

  return selectedModel;
};

export const getModelStatus = (
  hasApiKey: boolean,
  selectedModel?: string,
): ModelStatus => {
  if (!hasApiKey) {
    return {
      status: "error",
      text: "Action Required",
      className: "text-destructive",
    };
  }

  if (!selectedModel) {
    return {
      status: "warning",
      text: "No Model Selected",
      className: "text-muted-foreground",
    };
  }

  return {
    status: "success",
    text: "Ready",
    className: "text-green-600",
  };
};
