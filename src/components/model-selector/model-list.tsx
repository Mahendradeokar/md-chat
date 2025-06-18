"use client";

import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { type ModelListProps } from "./types";

export default function ModelList({
  models,
  selectedModel,
  onModelSelect,
  providers,
}: ModelListProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto">
      {Object.entries(models).map(([providerId, modelList]) => (
        <div key={providerId} className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-foreground text-sm font-medium">
              {providers.find((p) => p.id === providerId)?.name}
            </span>
          </div>

          <div className="space-y-2">
            {modelList.map((model) => (
              <button
                key={model.id}
                onClick={() => onModelSelect(model.id)}
                className={cn(
                  "w-full rounded-lg p-3 text-left transition-colors duration-150",
                  selectedModel === model.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent border-borderColor border",
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{model.name}</div>
                    <div className="mt-1 text-xs opacity-80">
                      {model.description}
                    </div>
                  </div>
                  {selectedModel === model.id && <Check className="h-4 w-4" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
