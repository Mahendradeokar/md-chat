"use client";

import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { useAuthActions } from "@convex-dev/auth/react";
import { useUser } from "~/hooks/use-user";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES_URL } from "~/constants";

export default function UserProfile() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { user } = useUser();

  const handleSignOut = async () => {
    await signOut();
    router.push(ROUTES_URL.AUTH);
  };

  return (
    <div className="border-borderColor border-t px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center space-x-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={user?.image} alt={user?.name} />
            {/* <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold"></AvatarFallback> */}
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="text-foreground truncate text-xs font-medium">
              {user?.name ?? user?.email}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="ml-3 text-xs"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
