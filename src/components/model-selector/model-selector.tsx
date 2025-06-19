"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ChevronDown, Check, Settings, TriangleAlertIcon } from "lucide-react";
import { type ModelSelectorProps, type ModelValue } from "./types";
import ApiKeyFormEdit from "./api-key-form";
import ModelList from "./model-list";
import { Condition, Else, ElseIf, If, Loading, Ternary } from "../shared";
import { api } from "~/../convex/_generated/api";
import { useQueryWithStatus } from "~/hooks/use-query-with-status";

export default function ModelSelector({
  selectedModel,
  onModelSelect,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: isApiConfigured, isPending } = useQueryWithStatus(
    api.apiKeys.isApiKeysConfigured,
    {},
  );

  const hasApiKey = Boolean(isApiConfigured);

  const handleModelSelect = (modelValue: ModelValue) => {
    onModelSelect(modelValue);
    setIsOpen(false);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(trueFalse) => {
        if (trueFalse === true && isPending) {
          return;
        }
        setIsOpen(trueFalse);
      }}
    >
      <PopoverTrigger asChild>
        <div className="border-borderColor border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-auto p-1 transition-colors duration-150"
                disabled={isPending}
              >
                <Condition>
                  <If condition={isPending}>
                    <Loading className="h-2 w-2" />
                  </If>
                  <ElseIf condition={hasApiKey}>
                    <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
                  </ElseIf>
                  <Else>
                    <TriangleAlertIcon className="text-yellow-500" />
                  </Else>
                </Condition>

                <span className="text-foreground text-sm font-medium">
                  <Ternary
                    condition={Boolean(hasApiKey && selectedModel?.name)}
                    fallback="Model Selection"
                  >
                    {selectedModel?.name}
                  </Ternary>
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="h-[500px] w-[400px]"
        align="start"
        side="top"
        sideOffset={8}
      >
        {isOpen && !isPending && (
          <ModelBody
            onModelSelect={handleModelSelect}
            hasApiKey={Boolean(isApiConfigured)}
            onCancel={() => setIsOpen(false)}
            key={Boolean(isApiConfigured).toString()}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}

function ModelBody({
  selectedModel,
  hasApiKey,
  onModelSelect,
}: ModelSelectorProps & {
  onCancel: () => void;
  hasApiKey: boolean;
}) {
  const [currantView, setCurrantView] = useState<
    "SET_API_KEY" | "EDIT_API_KEY" | "VIEW_MODEL_LIST"
  >(() => {
    return hasApiKey ? "VIEW_MODEL_LIST" : "SET_API_KEY";
  });

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h3 className="text-foreground text-lg font-semibold">
          Model Selection
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Choose your AI model and provider
        </p>
      </div>

      {(() => {
        switch (currantView) {
          case "SET_API_KEY": {
            return (
              <ApiKeyFormEdit
                mode="ADD"
                onCancel={() => setCurrantView("VIEW_MODEL_LIST")}
              />
            );
          }

          case "VIEW_MODEL_LIST":
          case "EDIT_API_KEY": {
            return (
              <div className="flex flex-1 flex-col space-y-4 overflow-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>API Key Configured</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrantView("EDIT_API_KEY")}
                    className="h-8 px-2"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <Condition>
                  <If condition={currantView === "EDIT_API_KEY"}>
                    <div className="space-y-4">
                      <ApiKeyFormEdit
                        mode="EDIT"
                        onCancel={() => setCurrantView("VIEW_MODEL_LIST")}
                      />
                    </div>
                  </If>
                  <Else>
                    <ModelList
                      selectedModel={selectedModel}
                      onModelSelect={onModelSelect}
                    />
                  </Else>
                </Condition>
              </div>
            );
          }
        }
      })()}
    </div>
  );
}
