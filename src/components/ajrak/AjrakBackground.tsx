import { cn } from "@/lib/utils";

interface AjrakBackgroundProps {
  className?: string;
  opacity?: number;
}

/**
 * Full-area subtle Ajrak lattice (Jaali) background.
 * Very low opacity so text readability is never compromised.
 * Pure inline SVG data-URI — zero network requests.
 */
export function AjrakBackground({ className, opacity = 0.05 }: AjrakBackgroundProps) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'><g fill='none' stroke='%23841B2D' stroke-width='1'><path d='M36 6 L42 30 L66 36 L42 42 L36 66 L30 42 L6 36 L30 30 Z'/><circle cx='36' cy='36' r='4'/><circle cx='0' cy='0' r='3'/><circle cx='72' cy='0' r='3'/><circle cx='0' cy='72' r='3'/><circle cx='72' cy='72' r='3'/></g></svg>`;
  const uri = `url("data:image/svg+xml,${svg}")`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ backgroundImage: uri, opacity }}
    />
  );
}
