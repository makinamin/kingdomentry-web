"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { buttonClass } from "./Button";

const KEY = "ke-consent";

/** Bottom-start card. The choice only gates analytics, which stay off until accepted. */
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
      className="fixed bottom-4 start-4 z-30 w-[calc(100%-2rem)] max-w-[420px] border border-line bg-white p-6 text-navy shadow-[0_20px_60px_rgba(2,29,94,0.18)]"
    >
      <p className="m-0 text-[14px] leading-relaxed text-navy/80">{t("text")}</p>
      <div className="mt-5 flex gap-2">
        <button type="button" onClick={() => choose("declined")} className={buttonClass("outline-navy", "!px-4 !py-3")}>
          {t("decline")}
        </button>
        <button type="button" onClick={() => choose("accepted")} className={buttonClass("royal", "!px-4 !py-3")}>
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
