"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { ApiKeyEditProps } from "./types";

export default function ApiKeyEdit({
  providerId,
  apiKey,
  showApiKey,
  onApiKeyChange,
  onShowApiKeyToggle,
  onUpdate,
  onCancel,
  providers,
}: ApiKeyEditProps) {
  const provider = providers.find((p) => p.id === providerId);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-foreground mb-2 block text-sm font-medium">
          Update API Key for {provider?.name}
        </label>
        <div className="relative">
          <Input
            type={showApiKey ? "text" : "password"}
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="h-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0"
            onClick={onShowApiKeyToggle}
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
          onClick={onCancel}
          className="h-9 flex-1"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={onUpdate}
          disabled={!apiKey.trim()}
          className="h-9 flex-1"
        >
          Update Key
        </Button>
      </div>
    </div>
  );
}
