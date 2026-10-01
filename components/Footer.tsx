import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { ArrowIcon, DownloadIcon } from "./icons";
import { Label } from "./Label";
import { FooterLanguages } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { SkylineLines } from "./SkylineLines";

/** Zeyna footer: royal blue, oversized nav words, arrowed contact lines. */
export function Footer() {
  const t = useTranslations();
  return (
    <footer className="relative isolate overflow-hidden bg-royal text-white">
      <SkylineLines className="text-white" opacity={0.12} />
      <div className="relative mx-auto w-full max-w-site px-6 pt-[clamp(70px,8vw,120px)]">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Logo mark="current" size={36} lockup label="Kingdom Entry" />
            <p className="m-0 mt-6 max-w-[36ch] text-[14px] leading-relaxed text-white/70">{t("gateway.utility")}</p>
            <p lang="ar" className="m-0 mt-5 font-arabic text-[22px] font-medium">
              {t("brand.arabicName")}
            </p>
          </div>
          <p className="m-0 text-h3 text-white">{t("footer.tagline")}</p>
        </div>

        <div className="mt-[clamp(60px,7vw,100px)] grid gap-12 border-t border-white/25 pt-10 lg:grid-cols-[1.2fr_1fr_0.6fr]">
          <div>
            <Label tone="dark">{t("footer.company")}</Label>
            <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[clamp(32px,3.6vw,48px)] leading-[1.15] tracking-[-0.04em]">
              {navItems.map((n) => (
                <Link key={n.key} href={n.href} className="text-white/65 no-underline hover:text-white">
                  {t(`nav.${n.key}`)}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-3">
            <Label tone="dark">{t("footer.contact")}</Label>
            <a href={`mailto:${site.email}`} className="mt-3 flex items-center gap-3 text-[16px] text-white no-underline hover:text-white/75">
              <ArrowIcon size={15} /> {t("footer.email")}
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[16px] text-white no-underline hover:text-white/75">
              <ArrowIcon size={15} /> {t("footer.linkedin")}
            </a>
            <a
              href={site.profilePdf}
              download
              className="mt-4 inline-flex items-center gap-3 self-start border border-white/40 px-4 py-3 text-[12px] font-medium uppercase tracking-label text-white no-underline transition-colors hover:bg-white hover:text-navy"
            >
              <DownloadIcon size={14} /> {t("footer.download")}
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <Label tone="dark">{t("footer.language")}</Label>
            <div className="mt-3 flex flex-col gap-2">
              <FooterLanguages />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/25 py-6 text-[12px] text-white/70">
          <span>{t("footer.rights")}</span>
          <span className="uppercase tracking-label">{t("brand.descriptor")}</span>
          <Link href="/privacy" className="text-white/70 no-underline hover:text-white">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
