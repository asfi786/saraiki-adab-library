import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "crimson" | "indigo" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  crimson:
    "bg-ajrak-crimson text-ajrak-ecru hover:bg-ajrak-crimson-dark focus-visible:ring-ajrak-crimson shadow-sm",
  indigo:
    "bg-ajrak-indigo text-ajrak-ecru hover:bg-ajrak-indigo-dark focus-visible:ring-ajrak-indigo shadow-sm",
  gold:
    "bg-ajrak-gold text-ajrak-iron hover:bg-[#c3923e] focus-visible:ring-ajrak-gold shadow-sm",
  outline:
    "border-2 border-ajrak-crimson text-ajrak-crimson hover:bg-ajrak-crimson hover:text-ajrak-ecru dark:border-ajrak-gold dark:text-ajrak-gold dark:hover:bg-ajrak-gold dark:hover:text-ajrak-iron",
  ghost:
    "text-ajrak-indigo hover:bg-ajrak-indigo/10 dark:text-ajrak-ecru dark:hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg min-h-[36px]",
  md: "px-5 py-2.5 rounded-xl text-base min-h-[44px]",
  lg: "px-7 py-3.5 rounded-xl text-lg min-h-[48px]",
};

export function Button({ variant = "crimson", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
