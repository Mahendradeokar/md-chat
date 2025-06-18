"use client";

import { Button } from "~/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { type ProviderManagementProps } from "./types";

export default function ProviderManagement({
  configuredProviders,
  onEditProvider,
  onDeleteProvider,
  onClose,
}: ProviderManagementProps) {
  return (
    <div className="flex flex-1 flex-col space-y-4">
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
                      {provider.hasKey ? "API Key configured" : "No API Key"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {provider.hasKey && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditProvider(provider.id)}
                      className="h-7 w-7 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteProvider(provider.id)}
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
            onClick={onClose}
            className="h-9 flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
