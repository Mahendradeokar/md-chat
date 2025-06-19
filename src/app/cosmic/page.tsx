import { CosmicLoader } from "~/components/shared";
import { ROUTES_URL } from "~/constants";

export default function CosmicPage() {
  return (
    <CosmicLoader
      title="Welcome to the AUM"
      description="Authenticating...."
      redirectPath={ROUTES_URL.CHAT}
    />
  );
}
