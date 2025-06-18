"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Plus,
  Search,
  Settings,
  MessageCircle,
  Lightbulb,
  Code,
  BookOpen,
  ChevronRight,
  Palette,
} from "lucide-react";
import Link from "next/link";

const mockThreads = [
  { id: 1, title: "Greeting", isActive: false, icon: MessageCircle },
  { id: 2, title: "New Thread", isActive: false, icon: Lightbulb },
  { id: 3, title: "Greeting Title", isActive: true, icon: MessageCircle },
  { id: 4, title: "History of Motivation", isActive: false, icon: BookOpen },
];

export default function DeprecatedSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside className="bg-card dark:bg-card border-borderColor flex h-full w-[20%] min-w-[280px] flex-col border-r">
      {/* Header */}
      <div className="border-borderColor border-b px-5 py-5">
        <h1 className="text-foreground text-2xl font-bold">T3.chat</h1>
      </div>

      {/* Search */}
      <div className="border-borderColor border-b px-5 py-4">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="text"
            placeholder="Search your threads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background dark:bg-background border-borderColor focus:ring-primary neo-pop-shadow-sm w-full rounded-xl border-2 py-2.5 pr-4 pl-10 text-sm transition-all duration-150 focus:border-transparent focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-3">
          <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
            Today
          </h3>

          <div className="space-y-1.5">
            {mockThreads.map((thread) => {
              return (
                <Link
                  key={thread.id}
                  href={thread.isActive ? "/" : `/conversation/${thread.id}`}
                >
                  <button
                    className={`group w-full rounded-lg border px-3 py-2.5 text-left transition-all duration-200 ${
                      thread.isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-primary/30 shadow-[2px_2px_0px_0px]"
                        : "bg-background dark:bg-background border-borderColor hover:bg-accent dark:hover:bg-accent hover:border-primary/30 hover:shadow-border hover:scale-[1.01] hover:shadow-[1px_1px_0px_0px] active:scale-[0.99]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`truncate text-sm font-medium transition-colors duration-200 ${
                          thread.isActive
                            ? "text-primary-foreground"
                            : "text-foreground group-hover:text-foreground"
                        }`}
                      >
                        {thread.title}
                      </span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-all duration-200 ${
                          thread.isActive
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5"
                        }`}
                      />
                    </div>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="border-borderColor border-t px-5 py-3">
        <Link href="/showcase">
          <Button
            variant="ghost"
            className="hover:bg-accent w-full justify-start rounded-lg p-3 text-left transition-all duration-200"
          >
            <Palette className="mr-2 h-4 w-4" />
            Design Showcase
          </Button>
        </Link>
      </div>

      {/* User Profile */}
      <div className="border-borderColor border-t px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center space-x-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                M
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="text-foreground truncate text-xs font-medium">
                MD
              </div>
              <div className="text-muted-foreground text-xs">Free</div>
            </div>
          </div>
          <Link href="/settings">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-accent ml-3 h-auto w-auto shrink-0 rounded-lg p-2"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
