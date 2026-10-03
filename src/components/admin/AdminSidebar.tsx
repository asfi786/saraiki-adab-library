"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, Tags, LogOut, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin", label: t("dashboard"), icon: LayoutDashboard, exact: true },
    { href: "/admin/books", label: t("manageBooks"), icon: BookOpen, exact: false },
    { href: "/admin/authors", label: t("manageAuthors"), icon: Users, exact: false },
    { href: "/admin/categories", label: t("manageCategories"), icon: Tags, exact: false },
  ];

  const logout = () => {
    try {
      sessionStorage.removeItem("sal_admin");
    } catch {
      /* ignore */
    }
    router.push("/admin");
  };

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <nav
        className="flex gap-2 overflow-x-auto rounded-2xl border border-ajrak-crimson/15 bg-white p-3 dark:border-white/10 dark:bg-ajrak-indigo-dark/60 lg:flex-col lg:overflow-visible"
        aria-label={t("dashboard")}
      >
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 font-nastaliq text-lg leading-nastaliq-tight transition-colors",
                active
                  ? "bg-ajrak-crimson text-ajrak-ecru dark:bg-ajrak-gold dark:text-ajrak-iron"
                  : "text-ajrak-indigo hover:bg-ajrak-crimson/10 dark:text-ajrak-ecru dark:hover:bg-white/10"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {l.label}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 font-nastaliq text-lg leading-nastaliq-tight text-ajrak-crimson hover:bg-ajrak-crimson/10 dark:text-ajrak-ecru dark:hover:bg-white/10"
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          {t("logout")}
        </button>
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm text-ajrak-iron/60 hover:bg-black/5 dark:text-ajrak-ecru/60 dark:hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
          {t("navHome")}
        </Link>
      </nav>
    </aside>
  );
}
