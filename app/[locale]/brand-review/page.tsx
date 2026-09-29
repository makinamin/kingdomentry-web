import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DiamondPattern } from "@/components/DiamondPattern";
import { Logo, MarkShapes } from "@/components/Logo";
import { routing } from "@/i18n/routing";
import { color, type ColorToken } from "@/lib/tokens";

// Internal scratch page for the step 1 review. Not linked, not indexed, not in the sitemap.
export const metadata: Metadata = {
  title: "Brand review",
  robots: { index: false, follow: false },
};

function Panel({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="border-t border-stone/30 py-12">
      <h2 className="text-[12px] font-medium uppercase tracking-label text-ink-soft">{title}</h2>
      {note ? <p className="mt-2 max-w-[70ch] text-[14.5px] text-ink-soft">{note}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Tile({ bg, caption, children }: { bg: string; caption: string; children: ReactNode }) {
  return (
    <figure className="m-0">
      <div className={`relative flex h-44 items-center justify-center overflow-hidden rounded-md ${bg}`}>{children}</div>
      <figcaption className="mt-2 text-[13px] text-ink-soft">{caption}</figcaption>
    </figure>
  );
}

export default async function BrandReview({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const title = t("hero.title");
  const cut = title.indexOf(".");
  const heroA = cut > -1 ? title.slice(0, cut + 1) : title;
  const heroB = cut > -1 ? title.slice(cut + 1).trim() : "";

  const swatches = Object.entries(color) as Array<[ColorToken, string]>;

  return (
    <main className="mx-auto max-w-site px-6 pb-24">
      <header className="flex flex-wrap items-center justify-between gap-6 py-10">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-label text-ink-soft">Step 1 · scaffold review</p>
          <h1 className="mt-2 text-[clamp(40px,5.5vw,76px)] font-medium leading-[1.04]">Logo and pattern</h1>
        </div>
        <nav aria-label="Language" className="flex gap-0.5 rounded-sm border border-stone/30 p-0.5">
          {routing.locales.map((l) => (
            <a
              key={l}
              href={`/${l}/brand-review/`}
              aria-current={l === locale ? "page" : undefined}
              className={`rounded-[6px] px-3 py-1.5 text-[13px] font-medium uppercase no-underline ${
                l === locale ? "bg-blue text-pearl hover:text-pearl" : "text-blue"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>
      </header>

      <Panel title="Mark variants" note="The four variants from assets/logo, each on its intended ground.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Tile bg="bg-blue" caption="Gold on blue">
            <Logo mark="gold" size={96} label="Kingdom Entry" />
          </Tile>
          <Tile bg="bg-pearl border border-stone/30" caption="Blue mark, gold diamond, on pearl">
            <Logo mark="blue" diamond="gold" size={96} label="Kingdom Entry" />
          </Tile>
          <Tile bg="bg-blue-deep" caption="Pearl on blue">
            <Logo mark="pearl" size={96} label="Kingdom Entry" />
          </Tile>
          <Tile bg="bg-white border border-stone/30 text-ink-soft" caption="One colour (currentColor)">
            <Logo mark="current" size={96} label="Kingdom Entry" />
          </Tile>
        </div>
      </Panel>

      <Panel title="Lockups in context" note="Header light (34px), header immersive (34px, pearl K with gold diamond), footer (40px).">
        <div className="grid gap-4">
          <div className="flex h-[76px] items-center rounded-md border border-stone/30 bg-pearl/95 px-6 text-blue backdrop-blur">
            <Logo mark="blue" diamond="gold" size={34} lockup />
          </div>
          <div className="overflow-hidden rounded-md bg-blue">
            <div className="flex h-[76px] items-center border-b border-gold-light/30 bg-blue-deep/70 px-6 text-pearl backdrop-blur">
              <Logo mark="pearl" diamond="gold" size={34} lockup />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-md border-t border-gold-light/50 bg-blue px-6 py-10 text-pearl">
            <DiamondPattern opacity={0.22} />
            <div className="relative">
              <Logo mark="gold" size={40} lockup />
              <p className="mt-4 text-[12px] font-medium uppercase tracking-label text-horizon">{t("brand.descriptor")}</p>
              <p lang="ar" className="mt-2 text-start font-arabic text-[22px] font-semibold text-pearl">
                {t("brand.arabicName")}
              </p>
              <p className="mt-2 font-light text-pearl">{t("footer.tagline")}</p>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Sizes" note="Mark minimum 16px. Lockup minimum 120px wide.">
        <div className="flex flex-wrap items-end gap-8">
          {[16, 24, 34, 48, 72].map((s) => (
            <figure key={s} className="m-0 text-center">
              <Logo mark="blue" diamond="gold" size={s} />
              <figcaption className="mt-2 text-[12px] text-ink-soft">{s}px</figcaption>
            </figure>
          ))}
          <figure className="m-0">
            <Logo mark="blue" diamond="gold" size={16} lockup />
            <figcaption className="mt-2 text-[12px] text-ink-soft">Smallest lockup (16px mark)</figcaption>
          </figure>
        </div>
      </Panel>

      <Panel title="Clear space" note="Clear space equals the width of the vertical bar: 24 of 120 units, 20% of the mark.">
        <div className="inline-block rounded-md border border-stone/30 bg-white p-8">
          <div className="border border-dashed border-gold" style={{ padding: 96 * 0.2 }}>
            <svg width="96" height="96" viewBox="0 0 120 120" aria-hidden className="block">
              <MarkShapes mark={color.blue} diamond={color.gold} />
            </svg>
          </div>
        </div>
      </Panel>

      <Panel title="The Diamond Path" note="Inline SVG pattern at each opacity the prototype uses, with the oversized mark at 14% as embossed accent.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            { o: 0.16, bg: "bg-blue", use: "Hero" },
            { o: 0.22, bg: "bg-blue", use: "Footer" },
            { o: 0.35, bg: "bg-blue", use: "Sector hero" },
            { o: 0.4, bg: "bg-blue", use: "CTA band, 404" },
            { o: 0.45, bg: "bg-blue-deep", use: "Gateway hero" },
          ].map(({ o, bg, use }) => (
            <Tile key={o} bg={bg} caption={`${Math.round(o * 100)}% · ${use}`}>
              <DiamondPattern opacity={o} />
            </Tile>
          ))}
          <Tile bg="bg-blue" caption="40% with mark at 14%">
            <DiamondPattern opacity={0.4} />
            <svg
              aria-hidden
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -start-16 -top-10 h-72 w-72 opacity-[0.14]"
            >
              <MarkShapes mark={color.gold} diamond={color.gold} />
            </svg>
          </Tile>
        </div>
      </Panel>

      <Panel title="Type in this locale" note="Ubuntu for Latin, Reem Kufi for Arabic. The wordmark stays Ubuntu and LTR.">
        <div className="relative overflow-hidden rounded-lg bg-[radial-gradient(ellipse_at_30%_40%,theme(colors.blue.lift),theme(colors.blue.DEFAULT)_45%,theme(colors.blue.deep))] px-8 py-16 text-pearl">
          <DiamondPattern opacity={0.16} />
          <div className="relative max-w-[46ch]">
            <p className="text-[12px] font-medium uppercase tracking-wide text-horizon">{t("hero.label")}</p>
            <p className="mt-4 text-[clamp(44px,6vw,88px)] font-light leading-[1.02] tracking-[-0.01em]">
              <span className="font-semibold text-gold-light">{heroA}</span> {heroB}
            </p>
            <p className="mt-6 text-[18px] font-light">{t("hero.sub")}</p>
          </div>
        </div>
      </Panel>

      <Panel title="Colour tokens" note="Read from tokens/tokens.json.">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {swatches.map(([name, hex]) => (
            <li key={name} className="list-none">
              <div className="h-16 rounded-sm border border-stone/30" style={{ background: hex }} />
              <p className="mt-2 text-[13px] font-medium">{name}</p>
              <p dir="ltr" className="text-start text-[12px] text-ink-soft">{hex}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </main>
  );
}
