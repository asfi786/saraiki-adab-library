"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { adminFetch } from "@/lib/adminAuth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { categoryName, formatNumber } from "@/lib/utils";

export default function AdminBooksPage() {
  const { t, language } = useLanguage();
  const { books, authors, categories, refresh } = useLibraryData();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const authorMap = new Map(authors.map((a) => [a.id, a.name]));
  const catMap = new Map(categories.map((c) => [c.id, c]));

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await adminFetch(`/api/admin/books?id=${encodeURIComponent(deleteId)}`, {
        method: "DELETE",
      });
    } catch {
      /* refresh anyway */
    }
    setDeleteId(null);
    refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t("manageBooks")} ({books.length})
        </h1>
        <Link href="/admin/books/new">
          <Button size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {t("addBook")}
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-start">
            <thead>
              <tr className="border-b border-ajrak-crimson/15 bg-ajrak-crimson/5 text-sm dark:border-white/10 dark:bg-white/5">
                <th className="px-4 py-3 font-nastaliq text-lg">{t("fieldTitle")}</th>
                <th className="px-4 py-3 font-nastaliq text-lg">{t("fieldAuthor")}</th>
                <th className="px-4 py-3 font-nastaliq text-lg">{t("fieldCategory")}</th>
                <th className="px-4 py-3 font-inter text-sm">{t("metaReads")}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ajrak-crimson/10 dark:divide-white/10">
              {books.map((b) => (
                <tr key={b.id} className="hover:bg-ajrak-crimson/[0.03] dark:hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-nastaliq text-lg leading-nastaliq-tight">
                    {b.title}
                    {b.uploaded && (
                      <span className="ms-2 inline-block rounded-full bg-ajrak-gold/20 px-2 py-0.5 align-middle font-nastaliq text-sm text-ajrak-gold-dark dark:text-ajrak-gold">
                        {t("uploadedBadge")}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-nastaliq text-base">{authorMap.get(b.authorId)}</td>
                  <td className="px-4 py-3 font-nastaliq text-base">
                    {catMap.get(b.categoryId) ? categoryName(catMap.get(b.categoryId)!, language) : "—"}
                  </td>
                  <td className="px-4 py-3 font-inter text-sm">{formatNumber(b.reads)}</td>
                  <td className="px-4 py-3">
                    {b.uploaded ? (
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/books/${b.id}`} aria-label={`${t("editBook")}: ${b.title}`}>
                          <span className="block rounded-lg p-2 text-ajrak-crimson hover:bg-ajrak-crimson/10 dark:text-ajrak-gold">
                            <Pencil className="h-4 w-4" />
                          </span>
                        </Link>
                        <button
                          onClick={() => setDeleteId(b.id)}
                          aria-label={`${t("deleteBook")}: ${b.title}`}
                          className="rounded-lg p-2 text-ajrak-crimson hover:bg-ajrak-crimson/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title={t("deleteBook")}>
        <p className="font-nastaliq text-lg">{t("confirmDelete")}</p>
        <div className="mt-5 flex gap-3">
          <Button variant="crimson" onClick={confirmDelete}>
            {t("yes")}
          </Button>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>
            {t("no")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
