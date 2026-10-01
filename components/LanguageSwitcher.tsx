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

/** EN / NL / AR pills. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const current = useLocale();
  const t = useTranslations("footer");
  const change = useSwitch();

  return (
    <div role="group" aria-label={t("language")} className={`flex gap-1 rounded-full bg-white/10 p-1 ${className}`}>
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
            className={`cursor-pointer rounded-full px-3 py-1.5 font-sans text-[12px] font-bold uppercase leading-none tracking-[0.06em] transition-colors ${
              active ? "bg-gd-violet text-white" : "bg-transparent text-white/75 hover:text-white"
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
          className={`group flex cursor-pointer items-center gap-3 self-start bg-transparent p-0 text-start text-[17px] transition-colors hover:text-white ${
            l === current ? "text-white" : "text-muted"
          }`}
        >
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${l === current ? "bg-gd-violet" : "bg-white/25 group-hover:bg-white"}`}
          />
          {localeNames[l]}
        </button>
      ))}
    </>
  );
}
