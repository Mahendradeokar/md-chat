import { Loading } from "./loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";

interface CosmicLoaderProps {
  title?: string;
  description?: string;
  redirectPath?: string | null;
  loadingDuration?: number;
  className?: string;
}

export function CosmicLoader({
  title = "Welcome to the Cosmos",
  description = "Authenticating....",
  redirectPath = null,
  loadingDuration = 2000,
  className = "",
}: CosmicLoaderProps) {
  const router = useRouter();

  useEffect(() => {
    if (redirectPath) {
      const redirectTimer = setTimeout(() => {
        router.push(redirectPath);
      }, loadingDuration);

      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [router, loadingDuration, redirectPath]);

  return (
    <div
      className={cn(
        "bg-background flex min-h-screen items-center justify-center p-6",
        className,
      )}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Loading />
          </div>
          {redirectPath && (
            <p className="text-muted-foreground text-center text-sm">
              Redirecting you...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
