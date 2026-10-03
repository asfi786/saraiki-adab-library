"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { AjrakBlueBand } from "@/components/ajrak/AjrakBluePattern";
import { Card } from "@/components/ui/Card";

export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <Card className="relative overflow-hidden p-8 text-center">
        <h2 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t("aboutAdab")}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl font-nastaliq text-xl leading-nastaliq text-ajrak-iron/80 dark:text-ajrak-ecru/80">
          {t("aboutAdabText")}
        </p>
      </Card>
      <AjrakBlueBand slim className="mt-6" />
    </section>
  );
}
