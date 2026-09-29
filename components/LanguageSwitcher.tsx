"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { rememberLocale } from "@/lib/locale-pref";
import { localeNames } from "@/lib/site";

function useSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  return (locale: Locale) => {
    rememberLocale(locale);
    router.replace(pathname, { locale, scroll: false });
  };
}

/** EN / NL / AR segmented control in the header. */
export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const current = useLocale();
  const t = useTranslations("footer");
  const change = useSwitch();
  const dark = tone === "dark";

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`flex gap-0.5 rounded-sm border p-0.5 ${dark ? "border-gold-light/[0.28]" : "border-stone/30"}`}
    >
      {routing.locales.map((l) => {
        const active = l === current;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            aria-label={localeNames[l]}
            onClick={() => (active ? undefined : change(l))}
            className={`cursor-pointer rounded-[6px] px-[9px] py-[5px] font-sans text-[12px] font-medium uppercase tracking-[0.08em] focus-visible:outline-offset-2 ${
              active
                ? dark
                  ? "bg-pearl text-blue-deep"
                  : "bg-blue text-pearl"
                : dark
                  ? "bg-transparent text-pearl hover:text-gold-light"
                  : "bg-transparent text-blue hover:text-gold"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

/** Full language names in the footer. */
export function FooterLanguages() {
  const current = useLocale();
  const change = useSwitch();
  return (
    <>
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === current}
          onClick={() => change(l)}
          className={`cursor-pointer self-start bg-transparent p-0 text-start text-[15px] hover:text-gold ${
            l === current ? "text-gold-light" : "text-pearl"
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </>
  );
}
