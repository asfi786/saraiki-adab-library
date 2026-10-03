import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ajrak-crimson/15 bg-white shadow-sm",
        "dark:border-white/10 dark:bg-ajrak-indigo-dark/60",
        className
      )}
      {...props}
    />
  );
}
