"use client";

import { useMDChat as useMDChat } from "~/hooks/use-chat";
import { Condition, Else, If, Ternary } from "~/components/shared";
import {
  AssistantMessage,
  ErrorMessage,
  UserMessage,
} from "~/components/messsage-types";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES_URL } from "~/constants";
import { generateUniqId } from "~/lib/utils";
import { createLogger } from "~/lib/modules/Logger";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

const logger = createLogger("CONVERSATION_PAGE");

export default function ConversationPage() {
  const router = useRouter();
  const params = useParams();
  const { messages, error, reload } = useMDChat();

  useEffect(() => {
    const id = params?.id as string;
    if (!generateUniqId.isValid(id)) {
      router.push(ROUTES_URL.CHAT);
    }
  }, [params?.id, router]);

  useEffect(() => {
    logger.debug("Last MESSAGE", messages.at(-1));
  }, [messages]);

  return (
    <>
      <ScrollArea className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto my-12 max-w-4xl space-y-6">
          {messages?.map((message, index) => {
            const isLastMessage = index === messages.length - 1;
            const shouldStream = isLastMessage && message.role === "assistant";

            return (
              <div key={message.id} className="group">
                <Condition>
                  <If condition={message.role == "user"}>
                    <UserMessage {...message} />
                  </If>
                  <Else>
                    <AssistantMessage
                      {...message}
                      shouldStream={shouldStream}
                    />
                  </Else>
                </Condition>
              </div>
            );
          })}
          <Ternary condition={Boolean(error)}>
            <ErrorMessage onRetry={reload} />
          </Ternary>
        </div>
        <ScrollBar />
      </ScrollArea>
    </>
  );
}
