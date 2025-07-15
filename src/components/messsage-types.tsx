import { Button } from "~/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import type { Message } from "@ai-sdk/react";
import { useState } from "react";
import { MarkdownView } from "./markdown-view";
import { isProduction } from "~/lib/utils";
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

  const hasContent = typeof content === "string" && content.trim().length > 0;

  return (
    <div className="flex items-start space-x-4">
      <div className="bg-background group relative w-[90%] rounded-2xl rounded-tl-md px-4 py-3">
        <MarkdownView markdown={content} />
        {/* <div>{content}</div> */}
        {hasContent && (
          <div className="text-muted-foreground mt-2 flex items-center text-xs">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground mr-2 h-auto w-auto p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              onClick={() => copyToClipboard(content, id)}
            >
              {copiedId === id ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const parseErrorMessage = (message: string) => {
  try {
    const errorObject = JSON.parse(message) as Record<string, string>;
    return errorObject.error ?? errorObject.message ?? message;
  } catch {
    return message;
  }
};
export const ErrorMessage = ({
  onRetry,
  error,
}: {
  onRetry: () => void;
  error: Error | undefined;
}) => {
  const showError =
    !isProduction() && error
      ? parseErrorMessage(error.message || String(error))
      : "Something went wrong while generating the response. Please retry again";

  return (
    <div className="flex items-start space-x-4">
      <div className="bg-destructive/10 dark:bg-destructive/10 dark:border-destructive/100 group relative max-w-[70%] rounded-2xl rounded-tl-md px-4 py-3 dark:border-2">
        <p className="text-destructive/100 text-sm leading-relaxed">
          {showError}
        </p>
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
