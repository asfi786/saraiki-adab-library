"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpenText, Menu, Moon, Sun } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { AjrakBlueBand, AjrakBluePattern } from "@/components/ajrak/AjrakBluePattern";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t("navHome") },
    { href: "/library", label: t("navLibrary") },
    { href: "/authors", label: t("navAuthors") },
    { href: "/about", label: t("navAbout") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div
        className={cn(
          "relative overflow-hidden bg-ajrak-indigo-dark text-ajrak-ecru transition-all duration-200",
          scrolled && "bg-ajrak-indigo-dark/95 shadow-lg backdrop-blur-md"
        )}
      >
        {/* whisper of Ajrak to tie the header to the hero */}
        <AjrakBluePattern opacity={0.12} />
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label={t("siteName")}>
            <span className="rounded-xl bg-ajrak-ecru/15 p-2">
              <BookOpenText className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="font-nastaliq text-xl leading-nastaliq-tight sm:text-2xl">
              {t("siteName")}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={t("menu")}>
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 font-nastaliq text-lg leading-nastaliq-tight transition-colors duration-200 hover:bg-white/15",
                    active && "text-ajrak-gold"
                  )}
                >
                  {l.label}
                  {/* active-page indicator: gold underline */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-ajrak-gold transition-opacity duration-200",
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("toggleLight") : t("toggleDark")}
              className={cn(
                "rounded-full p-2.5 transition-colors duration-200 hover:bg-white/15",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ajrak-ecru"
              )}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={() => setNavOpen(true)}
              aria-label={t("menu")}
              className="rounded-full p-2.5 transition-colors duration-200 hover:bg-white/15 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <AjrakBlueBand />
      </div>
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  );
}
