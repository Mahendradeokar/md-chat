"use client";

import { useChat } from "@ai-sdk/react";
import { processDataStream } from "@ai-sdk/ui-utils";
import { api } from "~/../convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { SSE_EVENTS } from "~/constants";
import { generateUniqId, tryCatch } from "~/lib/utils";
import type { SSEEvent } from "~/shared-types/SSE";
import { toast } from "./use-toast";
import { createLogger } from "~/lib/modules/Logger";

interface UseChatWithUrlParamsOptions {
  api?: string;
  chatOptions?: Omit<Parameters<typeof useChat>[0], "onResponse">;
}

const logger = createLogger("USE_MD_CHAT");

export function useMDChat(options: UseChatWithUrlParamsOptions = {}) {
  const { api: apiUrl = "/api/chat", chatOptions = {} } = options;

  const routeParams = useParams();
  const router = useRouter();
  const convex = useConvex();

  const threadId = useMemo(() => {
    const id = routeParams?.id;
    const fallbackId = generateUniqId();
    return (typeof id === "string" && id !== "~" ? id : null) ?? fallbackId;
  }, [routeParams]);

  const { setMessages, ...chat } = useChat({
    id: threadId ?? undefined,
    api: apiUrl,
    ...chatOptions,
    onResponse: async (streamResponse) => {
      const cloneStream = streamResponse.clone();
      if (cloneStream.body) {
        void processDataStream({
          stream: cloneStream.body,
          onDataPart: (dataPart) => {
            const rawEvent = dataPart[0];
            if (!rawEvent || typeof rawEvent !== "object") return;

            const event = rawEvent as unknown as SSEEvent;
            if (event.type === SSE_EVENTS.THREAD_CREATED) {
              const threadEvent = event;
              router.push(`/conversation/${threadEvent.data.threadId}`);
            }
          },
        });

        return;
      }
    },
    onError: (error) => {
      console.log("Error", error);
      // toast({
      //   title: "Error",
      //   description: error.message || "Something went wrong",
      //   variant: "destructive",
      // });
    },
  });

  useEffect(() => {
    void (async () => {
      if (threadId && threadId !== "~") {
        const results = await tryCatch(
          convex.query(api.messages.getMessages, {
            threadId,
          }),
        );

        if (results.error) {
          toast({
            title: "Woops!",
            description: "Something bad happen on server!",
          });
        }

        if (results.data?.length) {
          setMessages(
            results.data.map((msg) => {
              return {
                id: msg.messageId,
                content: msg.content,
                reasoning: msg.reasoningContent,
                role: msg.role,
              };
            }),
          );
        }
      }
    })();
  }, [threadId, convex, setMessages]);

  return {
    ...chat,
    setMessages,
    threadId,
  };
}
