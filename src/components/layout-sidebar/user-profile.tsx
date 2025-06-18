"use client";

import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function UserProfile() {
  const { setTheme, theme } = useTheme();
  return (
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 p-0"
        >
          <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}
