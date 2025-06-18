"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  ChevronDown,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  Settings,
  Edit,
  Trash2,
} from "lucide-react";
import { cn } from "~/lib/utils";

const PROVIDERS = [
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

// Static data for models (this would come from backend)
const MODELS = {
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

interface ModelSelectorProps {
  selectedModel?: string;
  onModelSelect: (model: string) => void;
  className?: string;
}

export default function ModelSelector({
  selectedModel,
  onModelSelect,
  className,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false); // This would come from your state management
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isAddingKey, setIsAddingKey] = useState(false);
  const [isManagingKeys, setIsManagingKeys] = useState(false);
  const [editingProvider, setEditingProvider] = useState<string | null>(null);

  // Mock configured providers - replace with your actual state
  const [configuredProviders, setConfiguredProviders] = useState([
    { id: "openrouter", name: "OpenRouter", icon: "🔗", hasKey: true },
    { id: "qroq", name: "Qroq", icon: "⚡", hasKey: false },
  ]);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim() && selectedProvider) {
      setHasApiKey(true);
      setIsAddingKey(false);
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

  const getSelectedModelName = () => {
    if (!selectedModel) return "Select Model";

    // Find the model name from our static data
    for (const provider of Object.values(MODELS)) {
      const model = provider.find((m) => m.id === selectedModel);
      if (model) return model.name;
    }

    return selectedModel;
  };

  const getModelStatus = () => {
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

  const status = getModelStatus();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            "text-muted-foreground hover:text-foreground h-auto p-1 transition-colors duration-150",
            !hasApiKey &&
              "border-destructive text-destructive hover:text-destructive hover:bg-destructive/10 border-2",
            className,
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
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
            // Flow 1: No API key provided
            <div className="flex flex-1 flex-col space-y-6">
              {!isAddingKey ? (
                // Show provider selection
                <div className="flex flex-1 flex-col space-y-4">
                  <div className="text-destructive flex items-center space-x-2 text-base">
                    <AlertCircle className="h-4 w-4" />
                    <span>API Key Required</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-foreground mb-2 block text-sm font-medium">
                        Select Provider
                      </label>
                      <Select
                        value={selectedProvider}
                        onValueChange={handleProviderSelect}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Choose a provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROVIDERS.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              <div className="flex items-center space-x-2">
                                <span>{provider.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-foreground mb-2 block text-sm font-medium">
                        API Key
                      </label>
                      <div className="relative">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          placeholder="Enter your API key"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="h-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsAddingKey(false);
                        setSelectedProvider("");
                        setApiKey("");
                      }}
                      className="h-9 flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveApiKey}
                      disabled={!apiKey.trim() || !selectedProvider}
                      className="h-9 flex-1"
                    >
                      Save Key
                    </Button>
                  </div>
                </div>
              ) : (
                // This state is not used in the new flow, but keeping for consistency
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              )}
            </div>
          ) : (
            // Flow 2: API key exists - show models
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
                // Manage API Keys view
                <div className="flex flex-1 flex-col space-y-4">
                  {editingProvider ? (
                    // Edit specific provider
                    <div className="space-y-4">
                      <div>
                        <label className="text-foreground mb-2 block text-sm font-medium">
                          Update API Key for{" "}
                          {
                            PROVIDERS.find((p) => p.id === editingProvider)
                              ?.name
                          }
                        </label>
                        <div className="relative">
                          <Input
                            type={showApiKey ? "text" : "password"}
                            placeholder="Enter your API key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="h-10 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="mt-auto flex space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsManagingKeys(false);
                            setEditingProvider(null);
                            setSelectedProvider("");
                            setApiKey("");
                          }}
                          className="h-9 flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleUpdateApiKey}
                          disabled={!apiKey.trim()}
                          className="h-9 flex-1"
                        >
                          Update Key
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Show configured providers list
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-foreground mb-3 text-base font-medium">
                          Configured Providers
                        </h4>
                        <div className="max-h-48 space-y-2 overflow-y-auto">
                          {configuredProviders.map((provider) => (
                            <div
                              key={provider.id}
                              className="border-borderColor flex items-center justify-between rounded-lg border p-3"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{provider.icon}</span>
                                <div>
                                  <div className="text-foreground text-sm font-medium">
                                    {provider.name}
                                  </div>
                                  <div className="text-muted-foreground text-xs">
                                    {provider.hasKey
                                      ? "API Key configured"
                                      : "No API Key"}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                {provider.hasKey && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleEditProvider(provider.id)
                                    }
                                    className="h-7 w-7 p-0"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteProvider(provider.id)
                                  }
                                  className="text-destructive hover:text-destructive h-7 w-7 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsManagingKeys(false)}
                          className="h-9 flex-1"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Models list view
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {Object.entries(MODELS).map(([providerId, models]) => (
                    <div key={providerId} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-foreground text-sm font-medium">
                          {PROVIDERS.find((p) => p.id === providerId)?.name}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {models.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => handleModelSelect(model.id)}
                            className={cn(
                              "w-full rounded-lg p-3 text-left transition-colors duration-150",
                              selectedModel === model.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent border-borderColor border",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium">
                                  {model.name}
                                </div>
                                <div className="mt-1 text-xs opacity-80">
                                  {model.description}
                                </div>
                              </div>
                              {selectedModel === model.id && (
                                <Check className="h-4 w-4" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isManagingKeys && (
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
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
