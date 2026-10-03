"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const SESSION_KEY = "sal_admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      // If the session flag exists but the password wasn't stored (e.g. it
      // was rotated), force a fresh login so API calls authenticate.
      const ok =
        sessionStorage.getItem(SESSION_KEY) === "1" &&
        !!sessionStorage.getItem("sal_admin_pw");
      if (!ok) {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem("sal_admin_pw");
      }
      setAuthed(ok);
    } catch {
      /* ignore */
    }
    setChecked(true);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === expected) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
        sessionStorage.setItem("sal_admin_pw", password);
      } catch {
        /* ignore */
      }
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!checked) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center font-nastaliq text-2xl">
        {t("readerLoading")}
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <Card className="w-full p-8 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ajrak-crimson/10 text-ajrak-crimson dark:bg-ajrak-gold/10 dark:text-ajrak-gold">
            <Lock className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
            {t("adminLogin")}
          </h1>
          <form onSubmit={login} className="mt-6 space-y-4">
            <label className="block text-start">
              <span className="mb-1 block font-nastaliq text-lg">{t("adminPassword")}</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border-2 border-ajrak-crimson/20 bg-transparent px-3 py-2.5 focus:border-ajrak-crimson focus:outline-none dark:border-white/15 dark:focus:border-ajrak-gold"
                dir="ltr"
              />
            </label>
            {error && (
              <p className="font-nastaliq text-lg text-ajrak-crimson" role="alert">
                {t("adminWrongPassword")}
              </p>
            )}
            <Button type="submit" className="w-full" size="lg">
              {t("adminLoginButton")}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
