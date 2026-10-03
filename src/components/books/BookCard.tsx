"use client";

import Link from "next/link";
import { Download, Eye, FlaskConical } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Badge } from "@/components/ui/Badge";
import { AjrakBorder } from "@/components/ajrak/AjrakBorder";
import { categoryName, coverPalette, formatNumber } from "@/lib/utils";
import type { Book, Category } from "@/types";

interface BookCardProps {
  book: Book;
  authorName: string;
  category?: Category;
}

export function BookCard({ book, authorName, category }: BookCardProps) {
  const { t, language } = useLanguage();
  const palette = coverPalette(book.id);

  return (
    <Link
      href={`/book/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ajrak-crimson/15 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-ajrak-crimson/10 dark:border-white/10 dark:bg-ajrak-indigo-dark/60"
      aria-label={book.title}
    >
      {/* Cover with Ajrak frame */}
      {book.coverUrl ? (
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.coverUrl}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="pointer-events-none absolute inset-2 rounded-lg border-2 opacity-60"
            style={{ borderColor: palette.accent }}
            aria-hidden="true"
          />
          {book.isSample && (
            <span className="absolute top-3 start-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur">
              <FlaskConical className="me-1 inline h-3 w-3" aria-hidden="true" />
              {language === "en" ? "Sample" : "نمونہ"}
            </span>
          )}
        </div>
      ) : (
      <div
        className="relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden p-4 text-center"
        style={{ backgroundColor: palette.bg }}
      >
        <div
          className="pointer-events-none absolute inset-2 rounded-lg border-2 opacity-60"
          style={{ borderColor: palette.accent }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-4 rounded border opacity-40"
          style={{ borderColor: palette.accent }}
          aria-hidden="true"
        />
        <p
          className="relative z-10 font-nastaliq text-xl leading-nastaliq-tight text-ajrak-ecru"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
        >
          {book.title}
        </p>
        <p className="relative z-10 mt-2 font-nastaliq text-sm text-ajrak-ecru/85">{authorName}</p>
        {book.isSample && (
          <span className="absolute top-3 start-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur">
            <FlaskConical className="me-1 inline h-3 w-3" aria-hidden="true" />
            {language === "en" ? "Sample" : "نمونہ"}
          </span>
        )}
      </div>
      )}
      <AjrakBorder variant="crimson" className="[height:10px]" />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3
          title={book.title}
          className="font-nastaliq text-lg leading-nastaliq-tight text-ajrak-indigo line-clamp-2 dark:text-ajrak-ecru"
        >
          {book.title}
        </h3>
        <p className="font-nastaliq text-base text-ajrak-iron/60 dark:text-ajrak-ecru/60">
          {t("byAuthor")} {authorName}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {category && <Badge tone="indigo">{categoryName(category, language)}</Badge>}
          <Badge tone="gold">
            {book.pages} {t("metaPages")}
          </Badge>
        </div>
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-ajrak-iron/55 dark:text-ajrak-ecru/55">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            {formatNumber(book.reads)}
          </span>
          <span className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            {formatNumber(book.downloads)}
          </span>
        </div>
      </div>
    </Link>
  );
}
