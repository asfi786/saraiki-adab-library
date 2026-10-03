"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpenText } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { AjrakBlueBand, AJRAK_WHISPER_TILE } from "@/components/ajrak/AjrakBluePattern";
import { AjrakStar } from "@/components/ajrak/AjrakStar";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: t("navHome") },
    { href: "/library", label: t("navLibrary") },
    { href: "/authors", label: t("navAuthors") },
    { href: "/about", label: t("navAbout") },
    { href: "/contact", label: t("navContact") },
    { href: "/copyright", label: t("copyrightTitle") },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden bg-ajrak-crimson text-ajrak-ecru">
      {/* same ajrak border strip as the header */}
      <AjrakBlueBand flip />
      {/* faint ajrak whisper */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-11 opacity-[0.06]"
        style={{ backgroundImage: AJRAK_WHISPER_TILE }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <BookOpenText className="h-7 w-7" aria-hidden="true" />
              <span className="font-nastaliq text-2xl leading-nastaliq-tight">{t("siteName")}</span>
            </div>
            <p className="mt-2 font-nastaliq text-lg leading-nastaliq-tight text-ajrak-ecru/70">
              {t("tagline")}
            </p>
            <p className="mt-3 text-sm text-ajrak-ecru/60">{t("footerTagline")}</p>
          </div>
          <nav aria-label={t("quickLinks")}>
            <h3 className="mb-3 font-nastaliq text-xl leading-nastaliq-tight text-ajrak-gold">
              {t("quickLinks")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-nastaliq text-lg leading-nastaliq-tight text-ajrak-ecru/80 transition-colors duration-200 hover:text-ajrak-ecru"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* heartfelt line about preserving the language */}
        <p className="mx-auto mt-10 max-w-2xl text-center font-nastaliq text-xl leading-nastaliq-tight text-ajrak-gold">
          {t("footerHeartfelt")}
        </p>

        {/* Creator credit */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-white/15 pt-8">
          <div className="flex items-center gap-4">
            <Image
              src="/images/asfund-ali.jpg"
              alt="Asfund Ali"
              width={72}
              height={72}
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-full object-cover object-[50%_28%] shadow-lg ring-2 ring-ajrak-gold/80"
            />
            <p className="font-nastaliq text-xl leading-nastaliq-tight text-ajrak-ecru sm:text-2xl">
              {t("craftedBy")}
            </p>
          </div>
          <a
            href="https://wa.me/923116530234?text=Assalam-o-Alaikum!%20Saraiki%20Adab%20Library%20ke%20liye%20meri%20tajweez%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 font-nastaliq text-lg leading-nastaliq-tight text-white shadow-lg transition-all duration-200 hover:bg-[#1fb857] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={t("whatsappSuggest")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.557h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("whatsappSuggest")}
          </a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 border-t border-white/15 pt-6 text-sm text-ajrak-ecru/60">
          <AjrakStar size={16} className="text-ajrak-gold" />
          <span>
            © {year} {t("siteName")} — {t("rightsReserved")}
          </span>
          <AjrakStar size={16} className="text-ajrak-gold" />
        </div>
      </div>
    </footer>
  );
}
