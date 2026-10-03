"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { adminFetch } from "@/lib/adminAuth";
import { BookForm, type BookFormValue } from "@/components/admin/BookForm";

export default function NewBookPage() {
  const { t } = useLanguage();
  const { authors, categories, refresh } = useLibraryData();
  const router = useRouter();

  const handleSave = async (value: BookFormValue) => {
    const res = await adminFetch("/api/admin/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book: {
          title: value.title,
          categoryId: value.categoryId,
          description: value.description,
          language: "skr",
          year: value.year,
          publisher: value.publisher,
          pages: value.pages,
          fileSize: "—",
          featured: false,
          isSample: false,
          pdfUrl: value.pdfUrl,
          coverUrl: value.coverUrl,
        },
        authorName: value.authorName,
      }),
    });
    if (!res.ok) throw new Error("save failed");
    refresh();
    router.push("/admin/books");
  };

  return (
    <div className="space-y-5">
      <h1 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {t("addBook")}
      </h1>
      <BookForm authors={authors} categories={categories} onSave={handleSave} />
    </div>
  );
}
