"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Plus, Send } from "lucide-react";
import { useMDChat } from "~/hooks/use-chat";
import { useRouter, usePathname } from "next/navigation";
import { appendIdInUrl } from "~/lib/utils";
import { getDefaultModel, ROUTES_URL } from "~/constants";
import { ModelSelector } from "./model-selector";
import { EventService } from "~/lib/modules/EventService";

export default function MessageInput() {
  const [selectedModel, setSelectedModel] = useState<{
    id: string;
    name: string;
  }>(getDefaultModel());

  const { input, handleInputChange, handleSubmit, threadId, setInput } =
    useMDChat({
      chatOptions: {
        body: {
          modelId: selectedModel.id,
        },
      },
    });

  const router = useRouter();
  const pathname = usePathname();

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      handleSubmit(e);
      if (!pathname.includes("conversation")) {
        router.push(appendIdInUrl(ROUTES_URL.CONVERSATION, threadId));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      void handleMessageSubmit(e);
    }
  };

  const handleModelSelect = (model: { id: string; name: string }) => {
    setSelectedModel(model);
  };

  useEffect(() => {
    const unsubscribe = EventService.listen<string>(
      EventService.EVENTS.SUGGESTED_PROMPT_CLICKED,
      (prompt) => {
        setInput(prompt);
      },
    );
    return () => unsubscribe();
  }, [setInput]);

  return (
    <div className="bg-background px-6 pb-6">
      <div className="relative mx-auto max-w-4xl">
        {/* New Chat Button - positioned at top right of input area */}
        <div className="absolute -top-12 right-0 z-10">
          <Button
            variant="outline"
            className="bg-background/80 neo-shadow rounded-full px-4 py-2 text-sm font-medium text-[hsl(var(--neo-gray-700))] backdrop-blur-sm transition-all duration-150 hover:scale-105 hover:bg-[hsl(var(--neo-gray-100))] active:scale-95"
            onClick={() => router.push(ROUTES_URL.CHAT)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Message Input Container with Model Wrapper */}
        <form onSubmit={handleMessageSubmit}>
          <div className="bg-card dark:bg-card border-borderColor neo-pop-shadow focus-within:ring-primary rounded-2xl border-2 transition-all duration-150 focus-within:border-transparent focus-within:ring-2">
            {/* Model Selector Header */}
            <ModelSelector
              selectedModel={selectedModel}
              onModelSelect={handleModelSelect}
            />

            {/* Input Area */}
            <div className="flex items-end px-4 py-3">
              {/* Un-cooked */}
              {/* <div className="mr-3 flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground h-auto rounded-lg p-2 transition-all duration-150 hover:bg-[hsl(var(--neo-gray-50))] hover:text-[hsl(var(--neo-gray-600))]"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground h-auto rounded-lg p-2 transition-all duration-150 hover:bg-[hsl(var(--neo-gray-50))] hover:text-[hsl(var(--neo-gray-600))]"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div> */}

              {/* Textarea */}
              <Textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here... (Ctrl + Enter to send)"
                className="text-foreground placeholder-muted-foreground max-h-[120px] min-h-10 flex-1 resize-none border-none bg-transparent py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height =
                    Math.min(target.scrollHeight, 120) + "px";
                }}
              />

              {/* Send button */}
              <Button
                disabled={!input.length}
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground ml-3 h-auto rounded-lg p-2 transition-all duration-150 hover:scale-105 active:scale-95"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
