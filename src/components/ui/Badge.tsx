import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "crimson" | "indigo" | "gold";
}

const tones: Record<string, string> = {
  crimson: "bg-ajrak-crimson/10 text-ajrak-crimson dark:bg-ajrak-crimson/30 dark:text-ajrak-ecru",
  indigo: "bg-ajrak-indigo/10 text-ajrak-indigo dark:bg-ajrak-indigo/40 dark:text-ajrak-ecru",
  gold: "bg-ajrak-gold/25 text-[#7a5a1e] dark:bg-ajrak-gold/25 dark:text-ajrak-gold",
};

export function Badge({ tone = "crimson", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium leading-nastaliq-tight",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
