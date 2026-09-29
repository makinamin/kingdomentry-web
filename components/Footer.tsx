import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { Diamond } from "./Diamond";
import { DiamondPattern } from "./DiamondPattern";
import { FooterLanguages } from "./LanguageSwitcher";
import { Logo } from "./Logo";

function ColumnLabel({ children }: { children: string }) {
  return <p className="m-0 mb-1.5 text-[12px] font-medium uppercase tracking-label text-horizon">{children}</p>;
}

const link = "self-start text-[15px] text-pearl no-underline hover:text-gold";

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="relative overflow-hidden border-t border-gold/50 bg-blue text-pearl">
      <DiamondPattern opacity={0.22} />
      <div className="relative mx-auto flex w-full max-w-site flex-col gap-14 px-6 pb-10 pt-[72px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
          <div className="flex flex-col gap-[18px]">
            <Logo mark="gold" size={40} lockup label="Kingdom Entry" />
            <p className="m-0 text-[11.5px] font-medium uppercase tracking-label text-horizon">
              {t("brand.descriptor")}
            </p>
            <p lang="ar" className="m-0 text-start font-arabic text-[22px] font-semibold text-pearl">
              {t("brand.arabicName")}
            </p>
            <p className="m-0 max-w-[30ch] text-[15px] font-light text-pearl">{t("footer.tagline")}</p>
          </div>

          <div className="flex flex-col gap-3">
            <ColumnLabel>{t("footer.company")}</ColumnLabel>
            {navItems.map((n) => (
              <Link key={n.key} href={n.href} className={link}>
                {t(`nav.${n.key}`)}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <ColumnLabel>{t("footer.contact")}</ColumnLabel>
            <a href={`mailto:${site.email}`} className={link}>
              {t("footer.email")}
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
              {t("footer.linkedin")}
            </a>
            <a
              href={site.profilePdf}
              download
              className="mt-2.5 flex items-center gap-2.5 self-start rounded-sm border border-gold px-4 py-3 text-[15px] text-pearl no-underline hover:bg-gold/[0.14] hover:text-pearl"
            >
              <Diamond size={8} />
              {t("footer.download")}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <ColumnLabel>{t("footer.language")}</ColumnLabel>
            <FooterLanguages />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-gold/40 pt-6 text-[13px] text-horizon">
          <span>{t("footer.rights")}</span>
          <Link href="/privacy" className="text-horizon no-underline hover:text-gold">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
