"use client";

import { Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { type ModelListProps } from "./types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { AVAILABLE_MODELS_LIST } from "~/constants";

export default function ModelList({
  selectedModel,
  onModelSelect,
}: ModelListProps) {
  return (
    <ScrollArea className="max-h-80">
      <div className="flex-1 space-y-2 overflow-y-auto">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {AVAILABLE_MODELS_LIST.map((model) => {
            const Icon = model.icon;
            return (
              <button
                key={model.id}
                onClick={() => onModelSelect(model)}
                className={cn(
                  "border-borderColor bg-background hover:bg-accent flex min-h-28 w-full flex-col items-center justify-center rounded-lg border p-2 shadow-sm transition-colors duration-150",
                  selectedModel?.id === model.id
                    ? "ring-primary bg-primary/10 ring-2"
                    : "",
                )}
              >
                <div className="flex w-full flex-col items-center justify-around gap-1">
                  <div className="mb-1 flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <div className="text-xs font-semibold">{model.name}</div>
                  </div>
                  {selectedModel?.id === model.id && (
                    <Check className="text-primary mt-1 h-4 w-4" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <ScrollBar orientation="vertical" className="visible opacity-100" />
    </ScrollArea>
  );
}
