import { cn } from "~/lib/utils";

interface LoadingProps {
  className?: string;
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="border-primary animate-spin rounded-full border-4 border-t-transparent"></div>
    </div>
  );
}
