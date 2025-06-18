"use client";

import Logo from "./logo";
import ThreadList from "./thread-list";
import UserProfile from "./user-profile";

export default function Sidebar() {
  return (
    <aside className="bg-card dark:bg-card border-borderColor flex h-full w-[20%] min-w-[280px] flex-col border-r">
      {/* Fixed top section */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Scrollable middle section */}
      <div className="min-h-0 flex-1">
        <ThreadList />
      </div>

      {/* Fixed bottom section */}
      <div className="flex-shrink-0">
        <UserProfile />
      </div>
    </aside>
  );
}
