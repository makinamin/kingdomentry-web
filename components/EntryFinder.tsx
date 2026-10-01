"use client";

import { useState } from "react";
import { useMessages, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ArrowIcon } from "./icons";

/**
 * Hero bar in place of Zeyna's property search: pick a sector and a pace,
 * then jump to that sector page (or to contact when no sector is chosen).
 */
export function EntryFinder() {
  const t = useTranslations();
  const router = useRouter();
  const m = useMessages() as unknown as {
    sectors: { items: Array<{ id: string; name: string }> };
    packages: { items: Array<{ name: string; duration: string }> };
  };
  const [sector, setSector] = useState("");
  const [pkg, setPkg] = useState("");

  const select =
    "w-full cursor-pointer appearance-none border-0 bg-transparent p-0 pe-6 text-[14px] text-white outline-none [&>option]:text-navy";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(sector ? `/sectors/${sector}` : "/contact");
      }}
      className="grid w-full max-w-[860px] grid-cols-1 border border-white/25 bg-navy/35 backdrop-blur-md sm:grid-cols-[1fr_1fr_auto]"
    >
      <label className="flex flex-col gap-1 border-b border-white/20 px-5 py-4 sm:border-b-0 sm:border-e">
        <span className="text-[11px] uppercase tracking-label text-white/60">{t("contact.form.sector")}</span>
        <span className="relative">
          <select value={sector} onChange={(e) => setSector(e.target.value)} className={select}>
            <option value="">{t("contact.form.sectorPlaceholder")}</option>
            {m.sectors.items.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2 text-[10px] text-white/70">▼</span>
        </span>
      </label>
      <label className="flex flex-col gap-1 border-b border-white/20 px-5 py-4 sm:border-b-0 sm:border-e">
        <span className="text-[11px] uppercase tracking-label text-white/60">{t("packages.label")}</span>
        <span className="relative">
          <select value={pkg} onChange={(e) => setPkg(e.target.value)} className={select}>
            <option value="">{t("packages.title")}</option>
            {m.packages.items.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} · {p.duration}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2 text-[10px] text-white/70">▼</span>
        </span>
      </label>
      <button
        type="submit"
        className="flex cursor-pointer items-center justify-center gap-3 border-0 bg-royal-2 px-7 py-5 text-[12px] font-medium uppercase tracking-label text-white transition-colors hover:bg-white hover:text-navy"
      >
        {t("gateway.quick")} <ArrowIcon size={16} />
      </button>
    </form>
  );
}
