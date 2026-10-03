import { cn } from "@/lib/utils";

interface AjrakBorderProps {
  variant?: "crimson" | "indigo" | "ecru";
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const COLORS: Record<string, { bg: string; fg: string; accent: string }> = {
  crimson: { bg: "#8C1D2C", fg: "#F7F2E7", accent: "#D4A24C" },
  indigo: { bg: "#16284E", fg: "#F7F2E7", accent: "#D4A24C" },
  ecru: { bg: "#F7F2E7", fg: "#8C1D2C", accent: "#16284E" },
};

/**
 * Reusable Ajrak border strip: repeating 8-pointed stars with trefoil
 * (Kakar) fills — the classic Hashiya (longitudinal border).
 */
export function AjrakBorder({
  variant = "crimson",
  orientation = "horizontal",
  className,
}: AjrakBorderProps) {
  const c = COLORS[variant];
  const id = `ajrak-${variant}-${orientation}`;
  const isH = orientation === "horizontal";

  return (
    <div
      className={cn("pointer-events-none select-none", className)}
      style={
        isH
          ? { height: 28, backgroundColor: c.bg }
          : { width: 28, backgroundColor: c.bg }
      }
      aria-hidden="true"
    >
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern
            id={id}
            width={isH ? 56 : 28}
            height={isH ? 28 : 56}
            patternUnits="userSpaceOnUse"
          >
            <rect width={isH ? 56 : 28} height={isH ? 28 : 56} fill={c.bg} />
            {/* star */}
            <g transform={isH ? "translate(28,14)" : "translate(14,28)"}>
              <path
                d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z"
                fill={c.fg}
              />
              <circle r="2.4" fill={c.accent} />
            </g>
            {/* trefoil dots between stars */}
            <g fill={c.accent} opacity="0.85">
              {isH ? (
                <>
                  <circle cx="6" cy="14" r="2" />
                  <circle cx="50" cy="14" r="2" />
                  <circle cx="14" cy="6" r="1.2" />
                  <circle cx="14" cy="22" r="1.2" />
                  <circle cx="42" cy="6" r="1.2" />
                  <circle cx="42" cy="22" r="1.2" />
                </>
              ) : (
                <>
                  <circle cx="14" cy="6" r="2" />
                  <circle cx="14" cy="50" r="2" />
                  <circle cx="6" cy="14" r="1.2" />
                  <circle cx="22" cy="14" r="1.2" />
                  <circle cx="6" cy="42" r="1.2" />
                  <circle cx="22" cy="42" r="1.2" />
                </>
              )}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
