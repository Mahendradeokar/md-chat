"use client";

import { useState } from "react";
import { ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import ThreadSearch from "./thread-search";
import { Condition, Else, If } from "../shared";
import { useParams } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { api } from "~/../convex/_generated/api";
import { useQueryWithStatus } from "~/hooks/use-query-with-status";

const ThreadLoading = () => {
  return Array.from({ length: 8 }).map((_, index) => (
    <div
      key={index}
      className="group bg-muted/30 relative mb-2 flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-300"
    >
      <div className="from-primary to-primary/60 absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b opacity-30" />
      <span className="min-w-0 flex-1">
        <div className="from-muted/50 to-muted/30 h-4 w-3/4 animate-pulse rounded bg-gradient-to-r" />
      </span>
      <div className="from-muted/50 to-muted/30 ml-2 h-4 w-4 animate-pulse rounded-full bg-gradient-to-r" />
    </div>
  ));
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="from-primary/10 to-secondary/10 mb-4 rounded-full bg-gradient-to-br p-4">
      <MessageSquare className="text-primary/60 h-8 w-8" />
    </div>
    <h3 className="text-foreground mb-2 text-lg font-semibold">
      No conversations yet
    </h3>
    <p className="text-muted-foreground mb-4 max-w-xs text-sm">
      Start your first conversation to see it appear here
    </p>
  </div>
);

export default function ThreadList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: threadList = [], isPending: isLoading } =
    useQueryWithStatus(api.thread.getThreads, {}) ?? [];

  const params = useParams();

  const isThreadActive = (threadId: string) => {
    const currentThreadId = params?.id;
    return currentThreadId === threadId;
  };

  const filteredThreads = threadList.filter((thread) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0">
        <ThreadSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Thread List */}
      <ScrollArea className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          <Condition>
            <If condition={isLoading}>
              <ThreadLoading />
            </If>
            <Else>
              {filteredThreads.length === 0 ? (
                <EmptyState />
              ) : (
                filteredThreads.map((thread) => {
                  const isActive = isThreadActive(thread.threadId);

                  return (
                    <Link
                      key={thread.threadId}
                      href={isActive ? "/" : `/conversation/${thread.threadId}`}
                    >
                      <div
                        className={`group relative flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ${
                          isActive
                            ? "from-primary/10 to-primary/5 text-primary bg-gradient-to-r shadow-sm"
                            : "hover:from-muted/30 hover:to-muted/10 text-muted-foreground hover:text-foreground hover:bg-gradient-to-r"
                        }`}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="from-primary to-primary/60 absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b" />
                        )}

                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {thread.title}
                        </span>

                        <ChevronRight
                          className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-primary group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </Link>
                  );
                })
              )}
            </Else>
          </Condition>
        </div>
      </ScrollArea>
    </div>
  );
}
