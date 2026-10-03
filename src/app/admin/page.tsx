"use client";

import Link from "next/link";
import { Plus, BookOpen, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { StatsCards } from "@/components/admin/StatsCards";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";

export default function AdminDashboard() {
  const { t, dir } = useLanguage();
  const { books, authors, categories } = useLibraryData();

  const totalDownloads = books.reduce((s, b) => s + b.downloads, 0);
  const topBooks = [...books].sort((a, b) => b.reads - a.reads).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t("dashboard")}
        </h1>
        <Link href="/admin/books/new">
          <Button size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {t("addBook")}
          </Button>
        </Link>
      </div>

      <StatsCards
        books={books.length}
        authors={authors.length}
        categories={categories.length}
        downloads={totalDownloads}
      />

      <Card className="p-5">
        <h2 className="mb-3 flex items-center gap-2 font-nastaliq text-2xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
          <BookOpen className="h-5 w-5 text-ajrak-crimson dark:text-ajrak-gold" aria-hidden="true" />
          {t("sortPopular")}
        </h2>
        <ul className="divide-y divide-ajrak-crimson/10 dark:divide-white/10">
          {topBooks.map((b, i) => (
            <li key={b.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className="flex items-center gap-3">
                <span className="font-inter text-sm font-bold text-ajrak-crimson/50 dark:text-ajrak-gold/60">
                  {i + 1}
                </span>
                <Link href={`/book/${b.id}`} className="font-nastaliq text-lg leading-nastaliq-tight hover:text-ajrak-crimson dark:hover:text-ajrak-gold">
                  {b.title}
                </Link>
              </span>
              <span className="font-inter text-sm text-ajrak-iron/55 dark:text-ajrak-ecru/55">
                {formatNumber(b.reads)} {t("metaReads")}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { href: "/admin/books", label: t("manageBooks") },
          { href: "/admin/authors", label: t("manageAuthors") },
          { href: "/admin/categories", label: t("manageCategories") },
        ].map((l) => (
          <Link key={l.href} href={l.href}>
            <Card className="flex items-center justify-between p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="font-nastaliq text-xl leading-nastaliq-tight">{l.label}</span>
              {dir === "rtl" ? (
                <ArrowLeft className="h-5 w-5 text-ajrak-crimson dark:text-ajrak-gold" aria-hidden="true" />
              ) : (
                <ArrowLeft className="h-5 w-5 rotate-180 text-ajrak-crimson dark:text-ajrak-gold" aria-hidden="true" />
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
