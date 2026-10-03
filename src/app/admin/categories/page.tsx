"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { loadCategories, saveCategories, uid } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { categoryName } from "@/lib/utils";
import type { Category } from "@/types";

const inputCls =
  "w-full rounded-xl border-2 border-ajrak-crimson/20 bg-transparent px-3 py-2 focus:border-ajrak-crimson focus:outline-none dark:border-white/15 dark:focus:border-ajrak-gold";

export default function AdminCategoriesPage() {
  const { t, language } = useLanguage();
  const { categories, books, refresh } = useLibraryData();
  const [editing, setEditing] = useState<Category | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [nameSk, setNameSk] = useState("");
  const [nameUr, setNameUr] = useState("");
  const [nameEn, setNameEn] = useState("");

  const openNew = () => {
    setIsNew(true);
    setNameSk("");
    setNameUr("");
    setNameEn("");
    setEditing({ id: "", nameSk: "", nameUr: "", nameEn: "", slug: "" });
  };

  const openEdit = (c: Category) => {
    setIsNew(false);
    setNameSk(c.nameSk);
    setNameUr(c.nameUr);
    setNameEn(c.nameEn);
    setEditing(c);
  };

  const save = () => {
    if (!nameSk.trim()) return;
    const all = loadCategories();
    const record: Category = {
      id: isNew ? uid("c") : editing!.id,
      nameSk: nameSk.trim(),
      nameUr: nameUr.trim() || nameSk.trim(),
      nameEn: nameEn.trim() || nameSk.trim(),
      slug: isNew
        ? nameEn.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || uid("cat")
        : editing!.slug,
    };
    saveCategories(isNew ? [...all, record] : all.map((c) => (c.id === record.id ? record : c)));
    setEditing(null);
    refresh();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    saveCategories(loadCategories().filter((c) => c.id !== deleteId));
    setDeleteId(null);
    refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t("manageCategories")} ({categories.length})
        </h1>
        <Button size="sm" onClick={openNew}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t("addCategory")}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-nastaliq text-xl leading-nastaliq-tight">{categoryName(c, language)}</p>
              <p className="font-inter text-xs text-ajrak-iron/55 dark:text-ajrak-ecru/55">
                {c.slug} · {books.filter((b) => b.categoryId === c.id).length} {t("statBooks")}
              </p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEdit(c)} aria-label={`Edit ${c.nameEn}`} className="rounded-lg p-2 text-ajrak-crimson hover:bg-ajrak-crimson/10 dark:text-ajrak-gold">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => setDeleteId(c.id)} aria-label={`Delete ${c.nameEn}`} className="rounded-lg p-2 text-ajrak-crimson hover:bg-ajrak-crimson/10">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={isNew ? t("addCategory") : t("manageCategories")}>
        <div className="grid gap-3">
          <label className="block">
            <span className="mb-1 block font-nastaliq text-lg">سرائیکی</span>
            <input value={nameSk} onChange={(e) => setNameSk(e.target.value)} className={`${inputCls} font-nastaliq text-lg`} />
          </label>
          <label className="block">
            <span className="mb-1 block font-nastaliq text-lg">اردو</span>
            <input value={nameUr} onChange={(e) => setNameUr(e.target.value)} className={`${inputCls} font-nastaliq text-lg`} />
          </label>
          <label className="block">
            <span className="mb-1 block font-inter text-sm">English</span>
            <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={`${inputCls} font-inter`} dir="ltr" />
          </label>
          <div className="flex gap-3">
            <Button onClick={save}>{t("save")}</Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>{t("cancel")}</Button>
          </div>
        </div>
      </Modal>

      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title={t("confirmDelete")}>
        <p className="font-nastaliq text-lg">{t("confirmDelete")}</p>
        <div className="mt-5 flex gap-3">
          <Button variant="crimson" onClick={confirmDelete}>{t("yes")}</Button>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>{t("no")}</Button>
        </div>
      </Modal>
    </div>
  );
}
