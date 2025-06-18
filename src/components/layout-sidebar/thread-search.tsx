"use client";

import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";

interface ThreadSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function ThreadSearch({
  searchQuery,
  onSearchChange,
}: ThreadSearchProps) {
  return (
    <div className="border-borderColor border-b px-5 py-4">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          type="text"
          placeholder="Search your threads..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-background dark:bg-background border-borderColor focus:ring-primary neo-pop-shadow-sm w-full rounded-xl border-2 py-2.5 pr-4 pl-10 text-sm transition-all duration-150 focus:border-transparent focus:ring-2 focus:outline-none"
        />
      </div>
    </div>
  );
}
