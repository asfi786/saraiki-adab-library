export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function categoryName(
  cat: { nameSk: string; nameUr: string; nameEn: string },
  lang: "skr" | "ur" | "en"
): string {
  if (lang === "ur") return cat.nameUr;
  if (lang === "en") return cat.nameEn;
  return cat.nameSk;
}

export function languageLabel(lang: "skr" | "ur" | "en"): string {
  if (lang === "skr") return "سرائیکی";
  if (lang === "ur") return "اردو";
  return "English";
}

/** Deterministic cover palette picked from the book id. */
export function coverPalette(id: string): { bg: string; accent: string } {
  const palettes = [
    { bg: "#841B2D", accent: "#D4A24C" },
    { bg: "#16284E", accent: "#008B9E" },
    { bg: "#008B9E", accent: "#F7F2E7" },
    { bg: "#5E1220", accent: "#C77B2E" },
    { bg: "#243B6B", accent: "#D4A24C" },
    { bg: "#1A1A1A", accent: "#008B9E" },
  ];
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return palettes[h % palettes.length];
}

/** Initials for avatar placeholders (handles Arabic-script names). */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]).join("");
}
