"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { loadAuthors, saveAuthors, uid } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import type { Author } from "@/types";

const inputCls =
  "w-full rounded-xl border-2 border-ajrak-crimson/20 bg-transparent px-3 py-2 font-nastaliq text-lg leading-nastaliq-tight focus:border-ajrak-crimson focus:outline-none dark:border-white/15 dark:focus:border-ajrak-gold";

export default function AdminAuthorsPage() {
  const { t } = useLanguage();
  const { authors, books, refresh } = useLibraryData();
  const [editing, setEditing] = useState<Author | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [era, setEra] = useState("");
  const [works, setWorks] = useState("");

  const openNew = () => {
    setIsNew(true);
    setName("");
    setBio("");
    setEra("");
    setWorks("");
    setEditing({ id: "", name: "", bio: "", era: "", notableWorks: [] });
  };

  const openEdit = (a: Author) => {
    setIsNew(false);
    setName(a.name);
    setBio(a.bio);
    setEra(a.era);
    setWorks(a.notableWorks.join("، "));
    setEditing(a);
  };

  const save = () => {
    if (!name.trim()) return;
    const all = loadAuthors();
    const record: Author = {
      id: isNew ? uid("a") : editing!.id,
      name: name.trim(),
      bio: bio.trim(),
      era: era.trim(),
      notableWorks: works.split(/[،,]/).map((w) => w.trim()).filter(Boolean),
    };
    saveAuthors(isNew ? [...all, record] : all.map((a) => (a.id === record.id ? record : a)));
    setEditing(null);
    refresh();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    saveAuthors(loadAuthors().filter((a) => a.id !== deleteId));
    setDeleteId(null);
    refresh();
  };

  const bookCount = (id: string) => books.filter((b) => b.authorId === id).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t("manageAuthors")} ({authors.length})
        </h1>
        <Button size="sm" onClick={openNew}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t("addAuthor")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {authors.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-nastaliq text-xl leading-nastaliq-tight">{a.name}</h2>
                <p className="text-sm text-ajrak-iron/55 dark:text-ajrak-ecru/55">
                  {a.era} · {bookCount(a.id)} {t("booksCount")}
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(a)} aria-label={`${t("fieldName")}: ${a.name}`} className="rounded-lg p-2 text-ajrak-crimson hover:bg-ajrak-crimson/10 dark:text-ajrak-gold">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteId(a.id)} aria-label={`${t("confirmDelete")}: ${a.name}`} className="rounded-lg p-2 text-ajrak-crimson hover:bg-ajrak-crimson/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 font-nastaliq text-base leading-nastaliq-tight text-ajrak-iron/70 dark:text-ajrak-ecru/70">
              {a.bio}
            </p>
          </Card>
        ))}
      </div>

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={isNew ? t("addAuthor") : t("fieldName")}>
        <div className="grid gap-3">
          <label className="block">
            <span className="mb-1 block font-nastaliq text-lg">{t("fieldAuthor")}</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block font-nastaliq text-lg">{t("fieldEra")}</span>
            <input value={era} onChange={(e) => setEra(e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block font-nastaliq text-lg">{t("fieldBio")}</span>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1 block font-nastaliq text-lg">{t("fieldName")}</span>
            <input value={works} onChange={(e) => setWorks(e.target.value)} className={inputCls} />
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
