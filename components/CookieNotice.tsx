"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const KEY = "ke-consent";

/** Bottom notice. The choice only gates analytics, which are off until accepted. */
export function CookieNotice() {
  const t = useTranslations("cookie");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setOpen(!localStorage.getItem(KEY));
    } catch {
      setOpen(true);
    }
  }, []);

  const choose = (v: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      // Storage blocked: ask again next visit.
    }
    window.dispatchEvent(new CustomEvent("ke-consent", { detail: v }));
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div
      role="region"
      aria-label={t("text")}
      className="fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-[760px] flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-night-deep/95 px-6 py-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md"
    >
      <p className="m-0 flex-[1_1_280px] text-[15px] text-white/80">{t("text")}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => choose("declined")}
          className="cursor-pointer rounded-full border border-white/25 bg-transparent px-5 py-3 text-[14px] font-bold text-white transition-colors hover:border-white"
        >
          {t("decline")}
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="cursor-pointer rounded-full border-0 bg-gd-violet px-6 py-3 text-[14px] font-bold text-white transition-transform hover:scale-105"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
