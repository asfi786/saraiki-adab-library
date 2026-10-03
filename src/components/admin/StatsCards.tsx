"use client";

import { BookOpen, Users, Tags, Download } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";

interface StatsCardsProps {
  books: number;
  authors: number;
  categories: number;
  downloads: number;
}

export function StatsCards({ books, authors, categories, downloads }: StatsCardsProps) {
  const { t } = useLanguage();

  const stats = [
    { label: t("totalBooks"), value: books, icon: BookOpen, bg: "#841B2D" },
    { label: t("totalAuthors"), value: authors, icon: Users, bg: "#16284E" },
    { label: t("totalCategories"), value: categories, icon: Tags, bg: "#008B9E" },
    { label: t("totalDownloads"), value: downloads, icon: Download, bg: "#C77B2E" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label} className="flex items-center gap-4 p-5">
            <span
              className="rounded-2xl p-3 text-ajrak-ecru"
              style={{ backgroundColor: s.bg }}
              aria-hidden="true"
            >
              <Icon className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-inter text-2xl font-bold text-ajrak-indigo dark:text-ajrak-ecru">
                {formatNumber(s.value)}
              </span>
              <span className="block font-nastaliq text-base leading-nastaliq-tight text-ajrak-iron/60 dark:text-ajrak-ecru/60">
                {s.label}
              </span>
            </span>
          </Card>
        );
      })}
    </div>
  );
}
