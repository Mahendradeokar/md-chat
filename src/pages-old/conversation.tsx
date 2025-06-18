import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Copy, User, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import MessageInput from "~/components/message-input";
import DeprecatedSidebar from "~/components/sidebar";

const mockMessages = [
  {
    id: 1,
    type: "user" as const,
    content: "Hello! How are you today?",
    timestamp: "2:30 PM",
  },
  {
    id: 2,
    type: "ai" as const,
    content:
      "Hello! I'm doing well, thank you for asking. I'm here and ready to help you with any questions or tasks you might have. How can I assist you today?",
    timestamp: "2:30 PM",
  },
  {
    id: 3,
    type: "user" as const,
    content: "Can you explain what artificial intelligence is?",
    timestamp: "2:32 PM",
  },
  {
    id: 4,
    type: "ai" as const,
    content:
      "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. AI systems can perform tasks that typically require human intelligence, such as:\n\n• **Learning**: Acquiring information and rules for using it\n• **Reasoning**: Using rules to reach approximate or definite conclusions\n• **Problem-solving**: Finding solutions to complex challenges\n• **Perception**: Interpreting sensory data\n• **Language understanding**: Processing and generating human language\n\nAI can be categorized into different types, from narrow AI (designed for specific tasks) to general AI (theoretical human-level intelligence across all domains). Today's AI systems are primarily narrow AI, excelling in specific areas like image recognition, natural language processing, or game playing.",
    timestamp: "2:32 PM",
  },
];

export default function ConversationPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (text: string, messageId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-background flex h-screen w-screen overflow-hidden">
      <DeprecatedSidebar />

      <main className="bg-background flex h-full flex-1 flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {mockMessages.map((message) => (
              <div key={message.id} className="group">
                {message.type === "user" ? (
                  <div className="flex items-start justify-end space-x-4">
                    <div className="bg-primary text-primary-foreground border-primary neo-pop-shadow max-w-[70%] rounded-2xl rounded-tr-md border-2 px-4 py-3">
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <div className="mt-2 text-xs opacity-75">
                        {message.timestamp}
                      </div>
                    </div>
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="flex items-start space-x-4">
                    <div className="bg-background group relative max-w-[70%] rounded-2xl rounded-tl-md px-4 py-3">
                      <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                      <div className="text-muted-foreground mt-2 flex items-center justify-end text-xs">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(message.content, message.id)
                          }
                          className="text-muted-foreground hover:text-foreground mr-2 h-auto w-auto p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <span>{message.timestamp}</span>
                      </div>
                      {copiedId === message.id && (
                        <div className="bg-popover text-popover-foreground animate-fade-in absolute top-2 right-0 rounded border px-2 py-1 text-xs">
                          Copied!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Input Area */}
        <MessageInput />
      </main>
    </div>
  );
}
