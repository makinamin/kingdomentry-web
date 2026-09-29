"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/site";
import { ButtonLink } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Sticky 76px header. Pearl at 94% with blur on light pages; blue-deep at 72%
 * with pearl text on the immersive home. Nav collapses into a Menu button under 1120px.
 */
export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dark = pathname === "/";

  // Close the menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const fg = dark ? "text-pearl" : "text-blue";

  return (
    <header
      className={`sticky top-0 z-20 border-b backdrop-blur-[8px] ${
        dark ? "border-gold-light/[0.28] bg-blue-deep/[0.72]" : "border-stone/30 bg-pearl/[0.94]"
      } ${fg}`}
    >
      <a
        href="#main"
        className="absolute start-4 top-3 z-30 -translate-y-24 rounded-sm bg-blue px-4 py-2 text-pearl no-underline focus:translate-y-0 focus:text-pearl"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-[76px] w-full max-w-site items-center justify-between gap-6 px-6">
        <Link href="/" aria-label="Kingdom Entry" className={`no-underline focus-visible:outline-offset-4 ${fg}`}>
          {/* Under 480px the lockup, language switch and Menu button cannot share one row, so the mark stands alone. */}
          <Logo mark={dark ? "pearl" : "blue"} diamond="gold" size={34} className="min-[480px]:hidden" />
          <Logo mark={dark ? "pearl" : "blue"} diamond="gold" size={34} lockup className="hidden min-[480px]:inline-flex" />
        </Link>

        <nav className="hidden items-center gap-[30px] min-[1120px]:flex">
          {navItems.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link
                key={n.key}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap border-b py-1.5 text-[14.5px] font-medium tracking-[0.02em] no-underline hover:text-gold focus-visible:outline-offset-4 ${fg} ${
                  active ? "border-gold" : "border-transparent"
                }`}
              >
                {t(n.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher tone={dark ? "dark" : "light"} />
          <ButtonLink
            href="/contact"
            variant={dark ? "gold-light" : "blue"}
            className="hidden !px-[22px] !py-3 !text-[14.5px] tracking-[0.02em] min-[1120px]:inline-flex"
          >
            {t("cta")}
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className={`cursor-pointer rounded-sm border bg-transparent px-3.5 py-[9px] text-[13px] font-medium tracking-[0.08em] min-[1120px]:hidden ${
              dark ? "border-pearl text-pearl" : "border-blue text-blue"
            }`}
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          className="flex flex-col gap-1 border-t border-stone/30 bg-pearl px-6 pb-6 pt-3 min-[1120px]:hidden"
        >
          {navItems.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              aria-current={isActive(pathname, n.href) ? "page" : undefined}
              className="border-b border-stone/25 py-2.5 text-[28px] font-medium text-blue no-underline"
            >
              {t(n.key)}
            </Link>
          ))}
          <ButtonLink href="/contact" variant="blue" className="mt-4 !py-4">
            {t("cta")}
          </ButtonLink>
        </nav>
      ) : null}
    </header>
  );
}
