import { Button } from "~/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import type { Message } from "@ai-sdk/react";
import { useState } from "react";
import { MarkdownView } from "./markdown-view";
// import { createLogger } from "~/lib/modules/Logger";
// import { useSmoothStreamingText } from "~/hooks/use-streaming-text";

export const UserMessage = ({ content }: Message) => {
  return (
    <div className="flex items-start justify-end space-x-4">
      <div className="bg-primary text-primary-foreground border-primary neo-pop-shadow max-w-[70%] rounded-2xl rounded-tr-md border-2 px-4 py-3">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

interface AssistantMessageProps extends Message {
  shouldStream?: boolean;
}

export const AssistantMessage = ({
  content,
  id,
  // shouldStream = false,
}: AssistantMessageProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text).catch((error) => {
      console.log(error);
    });
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // const { text: streamingText } = useSmoothStreamingText(content, {
  //   shouldStream,
  //   delay: 500,
  //   streamingMode: "word",
  // });

  // logger.debug("Streaming data", shouldStream);

  return (
    <div className="flex items-start space-x-4">
      <div className="bg-background group relative max-w-[90%] rounded-2xl rounded-tl-md px-4 py-3">
        <div className="text-foreground text-sm">
          <MarkdownView markdown={content} />
          {/* {streamingText} */}
        </div>
        <div className="text-muted-foreground mt-2 flex items-center text-xs">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(content, id)}
            className="text-muted-foreground hover:text-foreground mr-2 h-auto w-auto p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
        {copiedId === id && (
          <div className="bg-popover text-popover-foreground animate-fade-in absolute top-2 right-0 rounded border px-2 py-1 text-xs">
            Copied!
          </div>
        )}
      </div>
    </div>
  );
};

export const ErrorMessage = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-destructive/10 group relative max-w-[70%] rounded-2xl rounded-tl-md px-4 py-3">
        <p className="text-destructive text-sm leading-relaxed">
          Something went wrong while generating the response. This could be due
          to:
        </p>
        <ul className="text-destructive/80 mt-2 list-inside list-disc text-sm">
          <li>Network connectivity issues</li>
          <li>Server timeout</li>
          <li>Rate limiting</li>
        </ul>
        <div className="mt-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="text-destructive hover:text-destructive/80 h-auto w-auto p-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
