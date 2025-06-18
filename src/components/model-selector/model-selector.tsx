"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ChevronDown, Check, Settings, TriangleAlertIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { type ModelSelectorProps, type ConfiguredProvider } from "./types";
import { PROVIDERS, MODELS } from "./data";
import { getModelStatus } from "./utils";
import ApiKeyForm from "./api-key-form";
import ModelList from "./model-list";
import ProviderManagement from "./provider-management";
import ApiKeyEdit from "./api-key-edit";
import { Ternary } from "../shared";

export default function ModelSelector({
  selectedModel,
  onModelSelect,
  className,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isManagingKeys, setIsManagingKeys] = useState(false);
  const [editingProvider, setEditingProvider] = useState<string | null>(null);

  // Mock configured providers - replace with your actual state
  const [configuredProviders, setConfiguredProviders] = useState<
    ConfiguredProvider[]
  >([
    { id: "openrouter", name: "OpenRouter", icon: "🔗", hasKey: true },
    { id: "qroq", name: "Qroq", icon: "⚡", hasKey: false },
  ]);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim() && selectedProvider) {
      setHasApiKey(true);
      setApiKey("");
      setSelectedProvider("");

      // Update configured providers
      setConfiguredProviders((prev) =>
        prev.map((provider) =>
          provider.id === selectedProvider
            ? { ...provider, hasKey: true }
            : provider,
        ),
      );

      // Here you would typically save the API key to your state management
    }
  };

  const handleModelSelect = (modelId: string) => {
    onModelSelect(modelId);
    setIsOpen(false);
  };

  const handleEditProvider = (providerId: string) => {
    setEditingProvider(providerId);
    setSelectedProvider(providerId);
    setIsManagingKeys(true);
  };

  const handleDeleteProvider = (providerId: string) => {
    setConfiguredProviders((prev) =>
      prev.map((provider) =>
        provider.id === providerId ? { ...provider, hasKey: false } : provider,
      ),
    );

    // If this was the only provider with a key, reset the state
    const remainingProviders = configuredProviders.filter(
      (p) => p.id !== providerId || p.hasKey,
    );
    if (remainingProviders.every((p) => !p.hasKey)) {
      setHasApiKey(false);
    }
  };

  const handleUpdateApiKey = () => {
    if (apiKey.trim() && selectedProvider) {
      setConfiguredProviders((prev) =>
        prev.map((provider) =>
          provider.id === selectedProvider
            ? { ...provider, hasKey: true }
            : provider,
        ),
      );

      setIsManagingKeys(false);
      setEditingProvider(null);
      setSelectedProvider("");
      setApiKey("");
      // Here you would typically update the API key in your state management
    }
  };

  const status = getModelStatus(hasApiKey, selectedModel);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="border-borderColor border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-auto p-1 transition-colors duration-150"
              >
                <Ternary
                  condition={hasApiKey}
                  fallback={<TriangleAlertIcon className="text-yellow-500" />}
                >
                  <div className="h-2 w-2 animate-pulse rounded-full"></div>
                </Ternary>
                <span className="text-foreground text-sm font-medium">
                  {hasApiKey ? selectedModel : "Model Selection"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="h-[384px] w-[384px] p-0"
        align="start"
        side="top"
        sideOffset={8}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-6">
            <h3 className="text-foreground text-lg font-semibold">
              Model Selection
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Choose your AI model and provider
            </p>
          </div>

          {!hasApiKey ? (
            <ApiKeyForm
              selectedProvider={selectedProvider}
              apiKey={apiKey}
              showApiKey={showApiKey}
              onProviderSelect={handleProviderSelect}
              onApiKeyChange={setApiKey}
              onShowApiKeyToggle={() => setShowApiKey(!showApiKey)}
              onSave={handleSaveApiKey}
              onCancel={() => {
                setSelectedProvider("");
                setApiKey("");
              }}
              providers={PROVIDERS}
            />
          ) : (
            <div className="flex flex-1 flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>API Key Configured</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsManagingKeys(true)}
                  className="h-8 px-2"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {isManagingKeys ? (
                editingProvider ? (
                  <ApiKeyEdit
                    providerId={editingProvider}
                    apiKey={apiKey}
                    showApiKey={showApiKey}
                    onApiKeyChange={setApiKey}
                    onShowApiKeyToggle={() => setShowApiKey(!showApiKey)}
                    onUpdate={handleUpdateApiKey}
                    onCancel={() => {
                      setIsManagingKeys(false);
                      setEditingProvider(null);
                      setSelectedProvider("");
                      setApiKey("");
                    }}
                    providers={PROVIDERS}
                  />
                ) : (
                  <ProviderManagement
                    configuredProviders={configuredProviders}
                    onEditProvider={handleEditProvider}
                    onDeleteProvider={handleDeleteProvider}
                    onClose={() => setIsManagingKeys(false)}
                  />
                )
              ) : (
                <>
                  <ModelList
                    models={MODELS}
                    selectedModel={selectedModel}
                    onModelSelect={handleModelSelect}
                    providers={PROVIDERS}
                  />

                  <div className="border-borderColor border-t pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setHasApiKey(false);
                        setSelectedProvider("");
                        // Here you would typically clear the API key from your state management
                      }}
                      className="h-9 w-full"
                    >
                      Change API Key
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
