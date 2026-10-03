"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";

/** Friendly Saraiki error state (global route error boundary). */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();

  const msg =
    language === "en"
      ? "Something went wrong on our side."
      : language === "ur"
        ? "ہماری طرف سے کچھ مسئلہ ہو گیا ہے۔"
        : "ساݙی طرفوں کجھ مسئلہ تھی ڳیا ہے۔";
  const retry =
    language === "en" ? "Try again" : language === "ur" ? "دوبارہ کوشش کریں" : "ٻیا واری کوشش کرو";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {msg}
      </p>
      <p className="text-sm text-ajrak-iron/50 dark:text-ajrak-ecru/50">{error.digest}</p>
      <Button variant="crimson" onClick={reset}>
        {retry}
      </Button>
    </div>
  );
}
