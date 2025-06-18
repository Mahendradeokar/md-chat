"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { type ApiKeyFormProps } from "./types";

export default function ApiKeyForm({
  selectedProvider,
  apiKey,
  showApiKey,
  onProviderSelect,
  onApiKeyChange,
  onShowApiKeyToggle,
  onSave,
  onCancel,
  providers,
}: ApiKeyFormProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
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
            <Select value={selectedProvider} onValueChange={onProviderSelect}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Choose a provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
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
            onClick={onSave}
            disabled={!apiKey.trim() || !selectedProvider}
            className="h-9 flex-1"
          >
            Save Key
          </Button>
        </div>
      </div>
    </div>
  );
}
