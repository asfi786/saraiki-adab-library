import { AjrakStar } from "./AjrakStar";
import { cn } from "@/lib/utils";

interface AjrakDividerProps {
  className?: string;
}

/** Horizontal section divider: thin line with a centered star medallion. */
export function AjrakDivider({ className }: AjrakDividerProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2", className)} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-ajrak-crimson/40 to-ajrak-crimson/40 dark:via-ajrak-gold/40 dark:to-ajrak-gold/40" />
      <AjrakStar size={22} className="text-ajrak-crimson dark:text-ajrak-gold" />
      <div className="h-1.5 w-1.5 rotate-45 bg-ajrak-gold" />
      <AjrakStar size={14} className="text-ajrak-gold" />
      <div className="h-1.5 w-1.5 rotate-45 bg-ajrak-gold" />
      <AjrakStar size={22} className="text-ajrak-crimson dark:text-ajrak-gold" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ajrak-crimson/40 to-ajrak-crimson/40 dark:via-ajrak-gold/40 dark:to-ajrak-gold/40" />
    </div>
  );
}
