import { cn } from "@/lib/utils";

/**
 * Subtle Ajrak pattern for the "Midnight Ajrak" theme.
 * Strictly 4 colours (indigo, crimson, cream, gold) — no blue.
 * Transparent tile with line motifs only: a large 8-pointed star
 * medallion, small rosettes and fine jaali lattice lines, so it reads
 * like real ajrak cloth at a refined, larger scale.
 *
 * Pure inline SVG data-URIs — zero network requests, crisp at any DPI.
 */

/** Large refined motif tile (280px) for the hero — used at ~7% opacity. */
export const AJRAK_HERO_TILE = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'><g fill='none' stroke='%23F7F2E7' stroke-width='1.4' opacity='0.9'><path d='M140,60 L158,122 L220,140 L158,158 L140,220 L122,158 L60,140 L122,122 Z'/><path d='M140,92 L150,130 L188,140 L150,150 L140,188 L130,150 L92,140 L130,130 Z'/></g><circle cx='140' cy='140' r='10' fill='none' stroke='%23D4A24C' stroke-width='1.6'/><circle cx='140' cy='140' r='4' fill='%23D4A24C'/><g fill='none' stroke='%23F7F2E7' stroke-width='1' opacity='0.55'><circle cx='40' cy='40' r='14'/><circle cx='40' cy='40' r='6'/><circle cx='240' cy='40' r='14'/><circle cx='240' cy='40' r='6'/><circle cx='40' cy='240' r='14'/><circle cx='40' cy='240' r='6'/><circle cx='240' cy='240' r='14'/><circle cx='240' cy='240' r='6'/></g><g fill='%23D4A24C' opacity='0.8'><circle cx='40' cy='40' r='2.4'/><circle cx='240' cy='40' r='2.4'/><circle cx='40' cy='240' r='2.4'/><circle cx='240' cy='240' r='2.4'/></g><g stroke='%23F7F2E7' stroke-width='0.8' opacity='0.35'><path d='M0,140 L70,140 M210,140 L280,140 M140,0 L140,70 M140,210 L140,280'/></g></svg>")`;

/** Whisper texture tile (240px) for header/footer accents. */
export const AJRAK_WHISPER_TILE = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><g fill='none' stroke='%23F7F2E7' stroke-width='1'><path d='M120,88 L128,112 L152,120 L128,128 L120,152 L112,128 L88,120 L112,112 Z'/><circle cx='120' cy='120' r='3'/></g><g fill='%23D4A24C'><circle cx='40' cy='40' r='2'/><circle cx='200' cy='40' r='2'/><circle cx='40' cy='200' r='2'/><circle cx='200' cy='200' r='2'/></g></svg>")`;

/* Legacy export names kept so existing imports keep working. */
export const AJRAK_BLUE = "#16284E";
export const AJRAK_BLUE_DARK = "#0D1830";
export const AJRAK_BLUE_TILE = AJRAK_WHISPER_TILE;

export const AJRAK_BLUE_BAND = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='44' viewBox='0 0 96 44'><rect width='96' height='44' fill='%238C1D2C'/><rect y='2' width='96' height='2' fill='%23F7F2E7' opacity='0.85'/><rect y='40' width='96' height='2' fill='%23F7F2E7' opacity='0.85'/><path d='M-4,32 L12,12 L28,32 L44,12 L60,32 L76,12 L92,32 L108,12' fill='none' stroke='%23F7F2E7' stroke-width='5'/><g fill='%2316284E' stroke='%23F7F2E7' stroke-width='2'><path d='M12,3 L21,12 L12,21 L3,12 Z'/><path d='M44,3 L53,12 L44,21 L35,12 Z'/><path d='M76,3 L85,12 L76,21 L67,12 Z'/></g><g fill='%23D4A24C'><path d='M28,27 L33,32 L28,37 L23,32 Z'/><path d='M60,27 L65,32 L60,37 L55,32 Z'/><path d='M92,27 L97,32 L92,37 L87,32 Z'/></g></svg>")`;

interface AjrakBluePatternProps {
  className?: string;
  opacity?: number;
}

/** Full-area subtle Ajrak field. Pair with a deep-indigo base color. */
export function AjrakBluePattern({ className, opacity = 1 }: AjrakBluePatternProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ backgroundImage: AJRAK_WHISPER_TILE, opacity }}
    />
  );
}

interface AjrakBlueBandProps {
  className?: string;
  flip?: boolean;
  slim?: boolean;
}

/** Woven Ajrak border band (kaari) — a horizontal strip, like the textile's edge. */
export function AjrakBlueBand({ className, flip = false, slim = false }: AjrakBlueBandProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("w-full", slim ? "h-4" : "h-11", flip && "rtl-flip", className)}
      style={{
        backgroundImage: AJRAK_BLUE_BAND,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    />
  );
}
