"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Plus, Paperclip, Globe, Send, ChevronDown } from "lucide-react";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("Gemini 2.0 Flash");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="px-6 pb-6 bg-background">
      <div className="max-w-4xl mx-auto relative">
        {/* New Chat Button - positioned at top right of input area */}
        <div className="absolute -top-12 right-0 z-10">
          <Button
            variant="ghost"
            className="px-4 py-2 bg-background/80 backdrop-blur-sm hover:bg-[hsl(var(--neo-gray-100))] text-[hsl(var(--neo-gray-700))] text-sm font-medium rounded-full transition-all duration-150 hover:scale-105 active:scale-95 neo-shadow"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Message Input Container with Model Wrapper */}
        <form onSubmit={handleSubmit}>
          <div className="bg-card dark:bg-card border-2 border-borderColor rounded-2xl neo-pop-shadow focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all duration-150">
            {/* Model Selector Header */}
            <div className="px-4 py-3 border-b border-borderColor">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">{selectedModel}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-150 h-auto p-1"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
                

              </div>
            </div>

            {/* Input Area */}
            <div className="flex items-end px-4 py-3">
              {/* Input controls (left side inside textarea) */}
              <div className="flex items-center space-x-2 mr-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 text-muted-foreground hover:text-[hsl(var(--neo-gray-600))] hover:bg-[hsl(var(--neo-gray-50))] rounded-lg transition-all duration-150 h-auto"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 text-muted-foreground hover:text-[hsl(var(--neo-gray-600))] hover:bg-[hsl(var(--neo-gray-50))] rounded-lg transition-all duration-150 h-auto"
                >
                  <Globe className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Textarea */}
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 resize-none border-none outline-none text-foreground placeholder-muted-foreground bg-transparent py-2 min-h-10 max-h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
              
              {/* Send button */}
              <Button
                type="submit"
                className="ml-3 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 h-auto"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
