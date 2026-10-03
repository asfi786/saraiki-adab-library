"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { AjrakBorder } from "@/components/ajrak/AjrakBorder";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("navHome") },
    { href: "/library", label: t("navLibrary") },
    { href: "/authors", label: t("navAuthors") },
    { href: "/about", label: t("navAbout") },
    { href: "/contact", label: t("navContact") },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-200 lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside
        className={cn(
          "absolute top-0 bottom-0 w-72 max-w-[85vw] bg-ajrak-indigo-dark text-ajrak-ecru shadow-2xl transition-transform duration-200",
          "start-0",
          open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        )}
        role="dialog"
        aria-label={t("menu")}
      >
        <AjrakBorder variant="ecru" />
        <div className="flex items-center justify-between p-4">
          <span className="font-nastaliq text-xl leading-nastaliq">{t("siteName")}</span>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="rounded-full p-2 hover:bg-white/15"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 font-nastaliq text-lg leading-nastaliq-tight transition-colors duration-200 hover:bg-white/15",
                  active && "bg-white/10 text-ajrak-gold"
                )}
              >
                {l.label}
                {active && (
                  <span aria-hidden="true" className="h-5 w-1 rounded-full bg-ajrak-gold" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <AjrakBorder variant="ecru" />
        </div>
      </aside>
    </div>
  );
}
