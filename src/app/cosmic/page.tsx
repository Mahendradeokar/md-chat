"use client";

import { CosmicLoader } from "~/components/shared";
import { ROUTES_URL } from "~/constants";

export default function CosmicPage() {
  return (
    <CosmicLoader
      title="Welcome to the T3.Chat"
      description="Authenticating...."
      redirectPath={ROUTES_URL.CHAT}
    />
  );
} 