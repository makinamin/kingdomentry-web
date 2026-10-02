"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { moreItems, navItems, site } from "@/lib/site";
import { buttonClass } from "./Button";
import { ArrowIcon, CloseIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Zeyna header: transparent with white text over the royal hero; white with a
 * hairline and navy text once you scroll. Under 1280px the nav moves into a
 * full-screen royal menu with oversized links.
 */
export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const light = scrolled; // white bar, navy text

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,border-color] duration-500 ${
          light ? "border-b border-line bg-white/95 text-navy backdrop-blur" : "border-b border-white/20 bg-transparent text-white"
        }`}
      >
        <a
          href="#main"
          className="absolute start-4 top-3 z-50 -translate-y-24 bg-white px-4 py-2.5 text-[13px] font-medium text-navy no-underline focus:translate-y-0"
        >
          {t("skip")}
        </a>
        <div className="mx-auto flex h-[78px] w-full max-w-site items-center justify-between gap-6 px-6">
          <Link href="/" aria-label="Kingdom Entry" className="flex min-h-11 min-w-11 items-center text-current no-underline hover:text-current">
            <Logo mark="current" size={30} className="min-[480px]:hidden" />
            <Logo mark="current" size={30} lockup className="hidden min-[480px]:inline-flex" />
          </Link>

          <nav className="hidden items-center gap-6 min-[1280px]:flex">
            {navItems.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <Link
                  key={n.key}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`min-w-11 py-3 text-center text-[14px] text-current no-underline transition-opacity hover:text-current hover:opacity-100 ${
                    active ? "opacity-100" : "opacity-60"
                  }`}
                >
                  {t(n.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              href="/contact"
              className={`${buttonClass(light ? "royal" : "white")} hidden min-[1280px]:inline-flex`}
            >
              {t("cta")}
            </Link>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
              className="flex min-h-11 cursor-pointer items-center gap-3 border-0 bg-transparent px-2 py-3 text-[13px] font-medium uppercase tracking-label text-current min-[1280px]:hidden"
            >
              {t("menu")}
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className="block h-px w-6 bg-current" />
                <span className="block h-px w-6 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-royal text-white transition-[clip-path] duration-700 ease-out ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="mx-auto flex h-[78px] shrink-0 w-full max-w-site items-center justify-between px-6">
          <Logo mark="current" size={30} lockup />
          <button
            ref={closeButton}
            type="button"
            onClick={() => {
              setOpen(false);
              menuButton.current?.focus();
            }}
            className="flex min-h-11 cursor-pointer items-center gap-3 border-0 bg-transparent px-2 py-3 text-[13px] font-medium uppercase tracking-label text-white"
          >
            {t("close")} <CloseIcon size={20} />
          </button>
        </div>
        <nav className="mx-auto flex w-full max-w-site flex-1 flex-col justify-center px-6 py-[clamp(16px,4vh,40px)]">
          {navItems.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              aria-current={isActive(pathname, n.href) ? "page" : undefined}
              className={`self-start text-[clamp(26px,min(9.5vw,6.4vh),64px)] leading-[1.15] tracking-[-0.04em] no-underline transition-colors hover:text-white ${
                isActive(pathname, n.href) ? "text-white" : "text-white/65"
              }`}
            >
              {t(n.key)}
            </Link>
          ))}
          <div className="mt-6 flex flex-wrap gap-x-6">
            {moreItems.map((n) => (
              <Link key={n.key} href={n.href} className="inline-flex min-h-11 items-center text-[14px] uppercase tracking-label text-white/75 no-underline hover:text-white">
                {t(n.key)}
              </Link>
            ))}
          </div>
        </nav>
        <div className="mx-auto flex w-full max-w-site shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/25 px-6 py-[clamp(12px,3vh,32px)]">
          <a href={`mailto:${site.email}`} className="[overflow-wrap:anywhere] flex min-h-11 items-center gap-3 text-[16px] text-white no-underline hover:text-white/80">
            <ArrowIcon size={16} /> {site.email}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
