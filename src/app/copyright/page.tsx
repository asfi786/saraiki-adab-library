"use client";

import { Scale, Gavel } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/Card";

export default function CopyrightPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-center font-nastaliq text-4xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {t("copyrightTitle")}
      </h1>
      <div className="mt-8 space-y-6">
        <Card className="p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 font-nastaliq text-2xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
            <span className="rounded-xl bg-ajrak-crimson/10 p-2 text-ajrak-crimson dark:bg-ajrak-gold/10 dark:text-ajrak-gold">
              <Scale className="h-5 w-5" aria-hidden="true" />
            </span>
            {t("copyrightPolicy")}
          </h2>
          <p className="mt-3 font-nastaliq text-lg leading-nastaliq text-ajrak-iron/85 dark:text-ajrak-ecru/85">
            {t("copyrightPolicyText")}
          </p>
        </Card>
        <Card className="p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 font-nastaliq text-2xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
            <span className="rounded-xl bg-ajrak-crimson/10 p-2 text-ajrak-crimson dark:bg-ajrak-gold/10 dark:text-ajrak-gold">
              <Gavel className="h-5 w-5" aria-hidden="true" />
            </span>
            {t("copyrightTakedown")}
          </h2>
          <p className="mt-3 font-nastaliq text-lg leading-nastaliq text-ajrak-iron/85 dark:text-ajrak-ecru/85">
            {t("copyrightTakedownText")}
          </p>
        </Card>
      </div>
    </div>
  );
}
