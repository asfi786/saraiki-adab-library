"use client";

import { useState } from "react";
import { Send, CheckCircle2, BookPlus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const inputCls =
  "w-full rounded-xl border-2 border-ajrak-crimson/20 bg-transparent px-3 py-2.5 focus:border-ajrak-crimson focus:outline-none dark:border-white/15 dark:focus:border-ajrak-gold";

export default function ContactPage() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: no backend — just show success. Wire to an API route / email service in production.
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-center font-nastaliq text-4xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {t("contactTitle")}
      </h1>
      <p className="mt-2 text-center font-nastaliq text-xl text-ajrak-iron/65 dark:text-ajrak-ecru/65">
        {t("contactSubtitle")}
      </p>

      <Card className="mt-8 p-6 sm:p-8">
        {sent ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center animate-fade-in" role="status">
            <CheckCircle2 className="h-12 w-12 text-ajrak-crimson" aria-hidden="true" />
            <p className="font-nastaliq text-2xl leading-nastaliq">{t("formSuccess")}</p>
            <Button variant="ghost" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>
              {t("formSend")}
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-nastaliq text-lg">{t("formName")}</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputCls} font-nastaliq text-lg leading-nastaliq-tight`}
                />
              </label>
              <label className="block">
                <span className="mb-1 block font-nastaliq text-lg">{t("formEmail")}</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`${inputCls} font-inter`}
                  dir="ltr"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block font-nastaliq text-lg">{t("formMessage")}</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} font-nastaliq text-lg leading-nastaliq-tight`}
              />
            </label>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Send className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              {t("formSend")}
            </Button>
          </form>
        )}
      </Card>

      <Card className="mt-6 flex items-start gap-4 border-ajrak-crimson/30 p-6">
        <span className="rounded-xl bg-ajrak-crimson/10 p-3 text-ajrak-crimson dark:text-ajrak-gold">
          <BookPlus className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-nastaliq text-2xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
            {t("suggestBook")}
          </h2>
          <p className="mt-1 font-nastaliq text-lg leading-nastaliq-tight text-ajrak-iron/70 dark:text-ajrak-ecru/70">
            {t("suggestBookText")}
          </p>
        </div>
      </Card>
    </div>
  );
}
