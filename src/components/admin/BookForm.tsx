"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp, ImagePlus, Loader2, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { adminFetch } from "@/lib/adminAuth";
import { categoryName, cn } from "@/lib/utils";
import type { Author, Book, Category } from "@/types";

export interface BookFormValue {
  title: string;
  authorName: string;
  categoryId: string;
  description: string;
  year: number;
  publisher: string;
  pages: number;
  pdfUrl: string;
  coverUrl?: string;
}

interface BookFormProps {
  initial?: Book;
  initialAuthorName?: string;
  authors: Author[];
  categories: Category[];
  onSave: (value: BookFormValue) => Promise<void>;
}

const inputCls =
  "w-full rounded-xl border-2 border-ajrak-crimson/20 bg-transparent px-3 py-2 font-nastaliq text-lg leading-nastaliq-tight focus:border-ajrak-crimson focus:outline-none dark:border-white/15 dark:focus:border-ajrak-gold";

function formatBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

async function uploadFile(file: File, kind: "pdf" | "cover"): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("kind", kind);
  const res = await adminFetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error || "upload_failed");
  return data.url as string;
}

export function BookForm({ initial, initialAuthorName, authors, categories, onSave }: BookFormProps) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const pdfRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [authorName, setAuthorName] = useState(initialAuthorName ?? "");
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? categories[0]?.id ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [year, setYear] = useState(initial?.year ?? new Date().getFullYear());
  const [publisher, setPublisher] = useState(initial?.publisher ?? "");
  const [pages, setPages] = useState(initial?.pages ?? 100);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(initial?.coverUrl ?? null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickCover = (f: File | null) => {
    setCoverFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setCoverPreview(url);
    } else {
      setCoverPreview(initial?.coverUrl ?? null);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);

    if (!title.trim() || !authorName.trim()) return;
    if (!initial && !pdfFile) {
      setError(t("errPdfRequired"));
      return;
    }

    setBusy(true);
    try {
      let pdfUrl = initial?.pdfUrl ?? "";
      if (pdfFile) pdfUrl = await uploadFile(pdfFile, "pdf");

      let coverUrl = initial?.coverUrl;
      if (coverFile) {
        coverUrl = await uploadFile(coverFile, "cover");
      } else if (coverPreview === null) {
        coverUrl = undefined; // user removed the cover
      }

      await onSave({
        title: title.trim(),
        authorName: authorName.trim(),
        categoryId,
        description: description.trim(),
        year: Number(year) || new Date().getFullYear(),
        publisher: publisher.trim(),
        pages: Number(pages) || 0,
        pdfUrl,
        coverUrl,
      });
    } catch {
      setError(t("errUploadFailed"));
      setBusy(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1 block font-nastaliq text-lg">{t("fieldTitle")}</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} />
        </label>

        <label className="block">
          <span className="mb-1 block font-nastaliq text-lg">{t("fieldAuthor")}</span>
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            list="sal-author-suggestions"
            placeholder={t("fieldAuthor")}
            className={inputCls}
            autoComplete="off"
          />
          <datalist id="sal-author-suggestions">
            {authors.map((a) => (
              <option key={a.id} value={a.name} />
            ))}
          </datalist>
          <span className="mt-1 block text-sm text-ajrak-iron/60 dark:text-ajrak-ecru/60">
            {t("authorNameHint")}
          </span>
        </label>

        <label className="block">
          <span className="mb-1 block font-nastaliq text-lg">{t("fieldCategory")}</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={cn(inputCls, "bg-white dark:bg-ajrak-indigo-dark")}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {categoryName(c, language)}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block font-nastaliq text-lg">{t("fieldDescription")}</span>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputCls} />
        </label>

        {/* PDF picker (required for new books) */}
        <div className="block sm:col-span-2">
          <span className="mb-1 block font-nastaliq text-lg">
            {t("pdfFile")} {!initial && <span className="text-ajrak-crimson">*</span>}
          </span>
          <input
            ref={pdfRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
          />
          <button
            type="button"
            onClick={() => pdfRef.current?.click()}
            className="flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-ajrak-crimson/30 px-4 py-3 text-start transition-colors hover:border-ajrak-crimson/60 dark:border-white/15"
          >
            <FileUp className="h-6 w-6 shrink-0 text-ajrak-crimson dark:text-ajrak-gold" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              {pdfFile ? (
                <>
                  <span className="block truncate font-inter text-sm font-medium" dir="ltr">
                    {pdfFile.name}
                  </span>
                  <span className="block font-inter text-xs text-ajrak-iron/60" dir="ltr">
                    {formatBytes(pdfFile.size)}
                  </span>
                </>
              ) : (
                <span className="font-nastaliq text-lg text-ajrak-iron/60 dark:text-ajrak-ecru/60">
                  {initial ? initial.pdfUrl.split("/").pop() : t("choosePdf")}
                </span>
              )}
            </span>
            {pdfFile && (
              <span
                role="button"
                tabIndex={0}
                aria-label={t("removeCover")}
                className="rounded-full p-1 hover:bg-ajrak-crimson/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setPdfFile(null);
                  if (pdfRef.current) pdfRef.current.value = "";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    setPdfFile(null);
                  }
                }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </span>
            )}
          </button>
        </div>

        {/* Cover picker (optional) */}
        <div className="block sm:col-span-2">
          <span className="mb-1 flex items-center gap-2 font-nastaliq text-lg">
            {t("coverPhoto")}
            <span className="rounded-full bg-ajrak-gold/20 px-2 py-0.5 font-inter text-[11px] text-ajrak-gold-dark dark:text-ajrak-gold">
              {t("optional")}
            </span>
          </span>
          <input
            ref={coverRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => pickCover(e.target.files?.[0] ?? null)}
          />
          <div className="flex items-center gap-4">
            {coverPreview ? (
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverPreview}
                  alt=""
                  className="h-28 w-20 rounded-lg border border-ajrak-crimson/20 object-cover"
                />
                <button
                  type="button"
                  aria-label={t("removeCover")}
                  onClick={() => {
                    pickCover(null);
                    if (coverRef.current) coverRef.current.value = "";
                  }}
                  className="absolute -top-2 -end-2 rounded-full bg-ajrak-crimson p-1 text-white shadow"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => coverRef.current?.click()}
              className="flex flex-1 items-center gap-3 rounded-xl border-2 border-dashed border-ajrak-crimson/30 px-4 py-3 text-start transition-colors hover:border-ajrak-crimson/60 dark:border-white/15"
            >
              <ImagePlus className="h-6 w-6 shrink-0 text-ajrak-crimson dark:text-ajrak-gold" aria-hidden="true" />
              <span className="font-nastaliq text-lg text-ajrak-iron/60 dark:text-ajrak-ecru/60">
                {t("chooseCover")}
              </span>
            </button>
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block font-nastaliq text-lg">{t("fieldYear")}</span>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className={cn(inputCls, "font-inter")}
            dir="ltr"
          />
        </label>
        <label className="block">
          <span className="mb-1 block font-nastaliq text-lg">{t("metaPages")}</span>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className={cn(inputCls, "font-inter")}
            dir="ltr"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block font-nastaliq text-lg">{t("fieldPublisher")}</span>
          <input value={publisher} onChange={(e) => setPublisher(e.target.value)} className={inputCls} />
        </label>

        {error && (
          <p className="font-nastaliq text-lg text-ajrak-crimson sm:col-span-2" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit" disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {busy ? t("uploading") : t("save")}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()} disabled={busy}>
            {t("cancel")}
          </Button>
        </div>
      </form>
    </Card>
  );
}
