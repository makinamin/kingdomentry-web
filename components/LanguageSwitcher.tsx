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

/** EN / NL / AR, separated by hairlines. Inherits the header's text colour. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const current = useLocale();
  const t = useTranslations("footer");
  const change = useSwitch();
  return (
    <div role="group" aria-label={t("language")} className={`flex items-center ${className}`}>
      {routing.locales.map((l, i) => {
        const active = l === current;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            aria-label={localeNames[l]}
            onClick={() => (active ? undefined : change(l))}
            className={`relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center border-0 bg-transparent px-2 font-sans text-[12px] font-medium uppercase tracking-label ${
              i > 0
                ? "before:absolute before:start-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-current before:opacity-35 before:content-['']"
                : ""
            }`}
          >
            <span className={`transition-opacity ${active ? "opacity-100" : "opacity-50 hover:opacity-100"}`}>{l}</span>
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
          className={`min-h-11 min-w-11 cursor-pointer self-start border-0 bg-transparent p-0 text-start text-[15px] transition-colors hover:text-white ${
            l === current ? "text-white" : "text-white/55"
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </>
  );
}
