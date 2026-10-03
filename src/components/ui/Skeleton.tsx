import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-ajrak-crimson/10 dark:bg-white/10",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function BookCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ajrak-crimson/15 bg-white dark:border-white/10 dark:bg-ajrak-indigo-dark/60">
      <Skeleton className="aspect-[3/4] rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
