"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AlertCircle, Eye, EyeOff, Info } from "lucide-react";
import { type ApiKeyCommonProps } from "./types";
import Ternary from "../shared/ternary";
import { api } from "~/../convex/_generated/api";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Condition, Else, ElseIf, If } from "../shared";
import { useMutationWithAuth } from "~/hooks/use-mutation-with-auth";

export default function ApiKeyFormEdit({ mode, onCancel }: ApiKeyCommonProps) {
  const upsertAPIKey = useMutationWithAuth(api.apiKeys.updateApiKeys);
  const [apiKey, setApiKey] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showApiKey, setShowApiKey] = useState<boolean>(false);

  // Handler for form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || apiKey.trim().length < 10) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key (at least 10 characters).",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await upsertAPIKey({
        key: apiKey.trim(),
      });
      setApiKey("");
      onCancel();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "Whoops!",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        description: (err?.message as string) ?? "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-1 flex-col space-y-6"
      onSubmit={handleFormSubmit}
      autoComplete="off"
    >
      <div className="flex flex-1 flex-col space-y-4">
        <Ternary condition={mode === "ADD"}>
          <div className="text-destructive flex items-center space-x-2 text-base">
            <AlertCircle className="h-4 w-4" />
            <span>API Key Required</span>
          </div>
        </Ternary>
        <div className="space-y-4">
          <Ternary condition={mode === "ADD"}>
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                OpenRouter API Key
              </label>
            </div>
          </Ternary>
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Update API Key
            </label>
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="h-10 pr-10"
                autoComplete="off"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0"
                onClick={() => setShowApiKey((prev) => !prev)}
                tabIndex={-1}
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
        <div className="text-muted-foreground flex items-center space-x-2 text-sm">
          <Info className="h-4 w-4" />
          <span>
            If you don&apos;t provide an API key, the default free model will be
            used.
          </span>
        </div>
        <div className="mt-auto flex space-x-3">
          <Ternary condition={mode === "EDIT"}>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={onCancel}
              className="h-9 flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </Ternary>
          <Button
            size="sm"
            type="submit"
            disabled={isSubmitting || !apiKey.trim()}
            className="h-9 flex-1"
          >
            <Condition>
              <If condition={isSubmitting && mode === "EDIT"}>Updating...</If>
              <ElseIf condition={isSubmitting && mode !== "EDIT"}>
                Saving...
              </ElseIf>
              <Else>
                <Condition>
                  <If condition={mode === "EDIT"}>Update Key</If>
                  <Else>Save Key</Else>
                </Condition>
              </Else>
            </Condition>
          </Button>
        </div>
      </div>
    </form>
  );
}
