import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Link } from "wouter";

const mockThreads = [
  { id: 1, title: "Greeting", isActive: false, icon: MessageCircle },
  { id: 2, title: "New Thread", isActive: false, icon: Lightbulb },
  { id: 3, title: "Greeting Title", isActive: true, icon: MessageCircle },
  { id: 4, title: "History of Motivation", isActive: false, icon: BookOpen },
];

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside className="w-[20%] min-w-[280px] bg-card dark:bg-card border-r border-borderColor flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-5 border-b border-borderColor">
        <h1 className="text-2xl font-bold text-foreground">T3.chat</h1>
      </div>

      {/* Search */}
      <div className="px-5 py-4 border-b border-borderColor">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search your threads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background dark:bg-background border-2 border-borderColor rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150 neo-pop-shadow-sm"
          />
        </div>
      </div>

      {/* Thread List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-3">
          <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            Today
          </h3>

          <div className="space-y-1.5">
            {mockThreads.map((thread) => {
              return (
                <Link
                  key={thread.id}
                  href={thread.isActive ? "/" : `/chat/${thread.id}`}
                >
                  <button
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group border ${
                      thread.isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-[2px_2px_0px_0px] shadow-primary/30"
                        : "bg-background dark:bg-background border-borderColor hover:bg-accent dark:hover:bg-accent hover:border-primary/30 hover:shadow-[1px_1px_0px_0px] hover:shadow-border hover:scale-[1.01] active:scale-[0.99]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium transition-colors duration-200 truncate ${
                          thread.isActive
                            ? "text-primary-foreground"
                            : "text-foreground group-hover:text-foreground"
                        }`}
                      >
                        {thread.title}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-all duration-200 ${
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
      <div className="px-5 py-3 border-t border-borderColor">
        <Link href="/showcase">
          <Button variant="ghost" className="w-full justify-start text-left hover:bg-accent rounded-lg p-3 transition-all duration-200">
            <Palette className="w-4 h-4 mr-2" />
            Design Showcase
          </Button>
        </Link>
      </div>

      {/* User Profile */}
      <div className="px-5 py-4 border-t border-borderColor">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                M
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-foreground truncate">MD</div>
              <div className="text-xs text-muted-foreground">Free</div>
            </div>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="sm" className="p-2 h-auto w-auto hover:bg-accent rounded-lg flex-shrink-0 ml-3">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
