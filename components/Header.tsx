"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { ButtonLink } from "./Button";
import { ArrowIcon, ChatIcon, CloseIcon, MailIcon, MenuIcon } from "./icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Gilroy header-1: transparent over the dark hero with violet gradient slabs
 * behind the logo and the menu button. Turns solid black once you scroll.
 * Nav shows from 1200px; the menu button opens a side drawer at every size.
 */
export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 text-white transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled ? "bg-night-deep/90 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a
          href="#main"
          className="absolute start-4 top-3 z-50 -translate-y-24 rounded-full bg-white px-5 py-2.5 font-semibold text-ink no-underline focus:translate-y-0"
        >
          {t("skip")}
        </a>
        <div className="mx-auto flex h-[88px] w-full max-w-[1800px] items-center justify-between gap-6 px-4 sm:px-6">
          {/* Logo on its gradient slab */}
          <div className="relative flex h-full items-center">
            <span
              aria-hidden
              className={`absolute -inset-y-0 -start-[60vw] end-[-36px] -z-10 hidden bg-[linear-gradient(90deg,theme(colors.indigo)_85%,theme(colors.violet.DEFAULT)_94%,transparent)] transition-opacity duration-500 rtl:bg-[linear-gradient(270deg,theme(colors.indigo)_85%,theme(colors.violet.DEFAULT)_94%,transparent)] lg:block ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            />
            <Link href="/" aria-label="Kingdom Entry" className="text-white no-underline hover:text-white">
              <Logo mark="current" size={34} className="min-[480px]:hidden" />
              <Logo mark="current" size={34} lockup className="hidden min-[480px]:inline-flex" />
            </Link>
          </div>

          <nav className="hidden items-center gap-9 min-[1200px]:flex">
            {navItems.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <Link
                  key={n.key}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center gap-2 whitespace-nowrap text-[16px] font-semibold no-underline transition-colors hover:text-white ${
                    active ? "text-white" : "text-white/80"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${active ? "bg-violet-2" : "bg-white/30 group-hover:bg-violet-2"}`}
                  />
                  {t(n.key)}
                </Link>
              );
            })}
          </nav>

          <div className="relative flex h-full items-center gap-5">
            <Link
              href="/contact"
              className="hidden items-center gap-2 text-[16px] font-bold text-violet-soft no-underline hover:text-white min-[1200px]:flex"
            >
              <ChatIcon />
              {t("cta")}
            </Link>
            <LanguageSwitcher className="hidden sm:flex" />
            <div className="relative flex h-full items-center">
              <span
                aria-hidden
                className={`absolute inset-y-0 -end-[60vw] -start-[30px] -z-10 hidden bg-[linear-gradient(270deg,theme(colors.indigo)_87%,theme(colors.violet.DEFAULT)_94%,transparent)] transition-opacity duration-500 rtl:bg-[linear-gradient(90deg,theme(colors.indigo)_87%,theme(colors.violet.DEFAULT)_94%,transparent)] lg:block ${
                  scrolled ? "opacity-0" : "opacity-100"
                }`}
              />
              <button
                ref={menuButton}
                type="button"
                aria-expanded={open}
                aria-controls="side-menu"
                aria-label={t("menu")}
                onClick={() => setOpen(true)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 text-white transition-colors hover:bg-white/20 lg:bg-transparent"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        id="side-menu"
        aria-label={t("menu")}
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 end-0 z-50 flex w-full max-w-[460px] flex-col overflow-y-auto bg-night-deep px-8 pb-10 pt-6 text-white transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo mark="current" size={30} lockup />
          <button
            ref={closeButton}
            type="button"
            aria-label={t("close")}
            onClick={() => {
              setOpen(false);
              menuButton.current?.focus();
            }}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 bg-gd-violet text-white transition-transform duration-500 hover:rotate-90"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="mt-12 flex flex-col">
          {navItems.map((n, i) => (
            <Link
              key={n.key}
              href={n.href}
              aria-current={isActive(pathname, n.href) ? "page" : undefined}
              className={`group flex items-center justify-between border-b border-white/10 py-4 text-[28px] font-black no-underline transition-colors hover:text-white ${
                isActive(pathname, n.href) ? "text-white" : "text-white/70"
              }`}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {t(n.key)}
              <ArrowIcon className="opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </nav>
        <LanguageSwitcher className="mt-8 self-start sm:hidden" />
        <a href={`mailto:${site.email}`} className="mt-10 flex items-center gap-3 text-[17px] text-white/80 no-underline hover:text-white">
          <MailIcon /> {site.email}
        </a>
        <ButtonLink href="/contact" className="mt-8 self-start">
          {t("cta")}
        </ButtonLink>
      </aside>
    </>
  );
}
