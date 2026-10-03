"use client";

import { Target, History, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/Card";
import { AjrakStar } from "@/components/ajrak/AjrakStar";

export default function AboutPage() {
  const { t } = useLanguage();

  const sections = [
    { icon: Target, title: t("aboutMission"), text: t("aboutMissionText") },
    { icon: History, title: t("aboutHistory"), text: t("aboutHistoryText") },
    { icon: ShieldCheck, title: t("aboutPreserve"), text: t("aboutPreserveText") },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center">
        <AjrakStar size={48} className="mx-auto text-ajrak-crimson dark:text-ajrak-gold" />
        <h1 className="mt-2 font-nastaliq text-4xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t("aboutTitle")}
        </h1>
      </div>
      <div className="mt-8 space-y-6">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.title} className="p-6 sm:p-8">
              <h2 className="flex items-center gap-2.5 font-nastaliq text-2xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
                <span className="rounded-xl bg-ajrak-crimson/10 p-2 text-ajrak-crimson dark:bg-ajrak-gold/10 dark:text-ajrak-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {s.title}
              </h2>
              <p className="mt-3 font-nastaliq text-lg leading-nastaliq text-ajrak-iron/85 dark:text-ajrak-ecru/85">
                {s.text}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
