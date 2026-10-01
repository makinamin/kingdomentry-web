import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { Glow } from "./Glow";
import { ArrowUpRight, DownloadIcon, LinkedInIcon, MailIcon } from "./icons";
import { FooterLanguages } from "./LanguageSwitcher";
import { Logo } from "./Logo";

function ColumnTitle({ children }: { children: string }) {
  return <h2 className="m-0 mb-5 text-[20px] font-black !text-white">{children}</h2>;
}

const link = "self-start text-[17px] text-muted no-underline hover:text-white";

/** Gilroy footer-1: near-black, oversized call to action, four columns. */
export function Footer() {
  const t = useTranslations();
  return (
    <footer className="relative isolate overflow-hidden bg-night-deep text-white">
      <Glow className="-start-40 top-0 h-[380px] w-[380px] opacity-50" />
      <div className="relative mx-auto w-full max-w-site px-6 pt-[clamp(70px,8vw,110px)]">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
          <p className="m-0 max-w-[14ch] text-[clamp(40px,6.6vw,85px)] font-black leading-[1] tracking-[-0.01em] text-white">
            {t("footer.tagline")}
          </p>
          <Link
            href="/contact"
            className="group flex h-[150px] w-[150px] shrink-0 flex-col items-center justify-center gap-2 rounded-full bg-gd-violet text-center text-[15px] font-bold leading-tight text-white no-underline shadow-glow transition-transform duration-500 ease-spring hover:scale-110 hover:text-white"
          >
            <ArrowUpRight size={26} className="transition-transform duration-500 group-hover:rotate-45" />
            <span className="max-w-[11ch]">{t("nav.cta")}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo mark="current" size={40} lockup label="Kingdom Entry" />
            <p className="m-0 text-[13px] font-semibold uppercase tracking-label text-muted">{t("brand.descriptor")}</p>
            <p lang="ar" className="m-0 text-start font-arabic text-[24px] font-semibold text-white">
              {t("brand.arabicName")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <ColumnTitle>{t("footer.company")}</ColumnTitle>
            {navItems.map((n) => (
              <Link key={n.key} href={n.href} className={link}>
                {t(`nav.${n.key}`)}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <ColumnTitle>{t("footer.contact")}</ColumnTitle>
            <a href={`mailto:${site.email}`} className={`${link} flex items-center gap-3`}>
              <MailIcon /> {t("footer.email")}
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={`${link} flex items-center gap-3`}>
              <LinkedInIcon /> {t("footer.linkedin")}
            </a>
            <a
              href={site.profilePdf}
              download
              className="mt-4 inline-flex items-center gap-3 self-start rounded-full border border-white/20 px-5 py-3 text-[15px] font-semibold text-white no-underline transition-colors hover:border-violet hover:bg-violet hover:text-white"
            >
              <DownloadIcon /> {t("footer.download")}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <ColumnTitle>{t("footer.language")}</ColumnTitle>
            <FooterLanguages />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8 text-[15px] text-muted">
          <span>{t("footer.rights")}</span>
          <Link href="/privacy" className="text-muted no-underline hover:text-white">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
