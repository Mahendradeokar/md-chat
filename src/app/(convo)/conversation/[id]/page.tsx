"use client";

import { useMDChat as useMDChat } from "~/hooks/use-chat";
import { Condition, Else, If, Ternary } from "~/components/shared";
import {
  AssistantMessage,
  ErrorMessage,
  UserMessage,
} from "~/components/messsage-types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES_URL } from "~/constants";
import { generateUniqId } from "~/lib/utils";
import { MarkdownView } from "~/components/markdown-view";
import { createLogger } from "~/lib/modules/Logger";

const logger = createLogger("CONVERSATION_PAGE");

export default function ConversationPage() {
  const router = useRouter();
  const params = useParams();
  const { messages, error, reload, status } = useMDChat();
  const [test, setTest] = useState("");

  useEffect(() => {
    const id = params?.id as string;
    if (!generateUniqId.isValid(id)) {
      router.push(ROUTES_URL.CHAT);
    }
  }, [params?.id, router]);

  useEffect(() => {
    const textDeltas = [
      "React is a revolutionary JavaScript library",
      " that has transformed web development",
      " and modern application architecture.",
      " Let me provide you with an in-depth exploration",
      " of its fundamental concepts,",
      " advanced features,",
      " and real-world applications:",
      "\n\n**What is React?**\n\n",
      "React is an open-source JavaScript library",
      " developed by Facebook",
      " (now Meta)",
      " that introduced a paradigm shift",
      " in web development through its",
      " component-based architecture.",
      " It enables developers to create",
      " modular, reusable UI components",
      " that can be composed together",
      " to build sophisticated applications",
      " with maintainable and scalable code.",
      "\n\n**Core Features and Architecture**\n\n",
      "React's virtual DOM implementation",
      " provides exceptional performance",
      " by minimizing actual DOM manipulations.",
      " Its one-way data flow",
      " makes applications more predictable",
      " and easier to debug.",
      "\n\n**Advanced Component Patterns**\n\n",
      "Modern React development leverages",
      " powerful patterns like hooks,",
      " context API, and custom hooks",
      " for state management and",
      " side effects.",
      " Higher-order components",
      " and render props enable",
      " code reuse and composition.",
      "\n\n**Ecosystem and Best Practices**\n\n",
      "The React ecosystem includes",
      " essential tools like React Router",
      " for navigation,",
      " Redux for state management,",
      " and various testing utilities.",
      " Best practices include",
      " proper component composition,",
      " performance optimization,",
      " and accessibility considerations.",
      "\n\n**Future of React**\n\n",
      "React continues to evolve with",
      " features like concurrent mode,",
      " server components,",
      " and improved performance.",
      " The community-driven nature",
      " ensures continuous innovation",
      " and adaptation to modern needs.",
    ];
    let currentIndex = 0;
    let interval: NodeJS.Timeout;

    const startNextInterval = () => {
      interval = setInterval(() => {
        if (currentIndex < textDeltas.length) {
          setTest((prev) => prev + textDeltas[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          // Start the next interval if there are more messages
          if (currentIndex < textDeltas.length) {
            startNextInterval();
          }
        }
      }, 50);
    };

    startNextInterval();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logger.debug("Last MESSAGE", messages.at(-1));
  }, [messages]);

  return (
    <>
      <div className="flex-1 overflow-y-auto px-8 py-6">
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
          {/* <MarkdownView markdown={test} /> */}
        </div>
      </div>
    </>
  );
}
