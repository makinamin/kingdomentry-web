"use client";

import { useState } from "react";
import { useMessages, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ArrowIcon } from "./icons";

/**
 * Hero bar in place of Zeyna's property search: pick a sector and where you are
 * in your journey, then land on the contact form with both already selected.
 */
export function EntryFinder() {
  const t = useTranslations();
  const router = useRouter();
  const m = useMessages() as unknown as {
    sectors: { items: Array<{ id: string; name: string }> };
    contact: { form: { stages: string[] } };
  };
  const [sector, setSector] = useState("");
  const [stage, setStage] = useState("");

  const select =
    "w-full cursor-pointer appearance-none border-0 bg-transparent py-2 pe-6 ps-0 text-[16px] lg:text-[15px] text-white outline-none [&>option]:text-navy";
  const Caret = () => (
    <span aria-hidden className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2 text-[10px] text-white/70">
      ▼
    </span>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams();
        if (sector) q.set("sector", sector);
        if (stage) q.set("stage", stage);
        const qs = q.toString();
        router.push(qs ? `/contact?${qs}` : "/contact");
      }}
      className="grid w-full max-w-[860px] grid-cols-1 border border-white/25 bg-navy/35 backdrop-blur-md sm:grid-cols-[1fr_1fr_auto]"
    >
      <label className="flex flex-col gap-1 border-b border-white/20 px-5 py-3 text-start sm:border-b-0 sm:border-e">
        <span className="text-[12px] uppercase tracking-label text-white/70">{t("home.hero.finderSector")}</span>
        <span className="relative">
          <select value={sector} onChange={(e) => setSector(e.target.value)} className={select}>
            <option value="">{t("home.hero.finderSectorAny")}</option>
            {m.sectors.items.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <Caret />
        </span>
      </label>
      <label className="flex flex-col gap-1 border-b border-white/20 px-5 py-3 text-start sm:border-b-0 sm:border-e">
        <span className="text-[12px] uppercase tracking-label text-white/70">{t("home.hero.finderStage")}</span>
        <span className="relative">
          <select value={stage} onChange={(e) => setStage(e.target.value)} className={select}>
            <option value="">{t("home.hero.finderStageAny")}</option>
            {m.contact.form.stages.map((s, i) => (
              <option key={s} value={String(i)}>
                {s}
              </option>
            ))}
          </select>
          <Caret />
        </span>
      </label>
      <button
        type="submit"
        className="flex cursor-pointer items-center justify-center gap-3 border-0 bg-royal-2 px-7 py-5 text-[12px] font-medium uppercase tracking-label text-white transition-colors hover:bg-white hover:text-navy"
      >
        {t("home.hero.finderGo")} <ArrowIcon size={16} />
      </button>
    </form>
  );
}
