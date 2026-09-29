import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Button, ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { CreditsList } from "@/components/CreditsList";
import { CtaBand } from "@/components/CtaBand";
import { DiamondList } from "@/components/Diamond";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { JourneySteps, type Step } from "@/components/JourneySteps";
import { PackageCard, type Package } from "@/components/PackageCard";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SectorTile, type Sector } from "@/components/SectorTile";
import { StatCard } from "@/components/StatCard";

// Internal scratch page for the step 2 review. Not linked, not indexed, not in the sitemap.
export const metadata: Metadata = {
  title: "Components review",
  robots: { index: false, follow: false },
};

type Messages = {
  packages: { items: Package[] };
  sectors: { items: Sector[] };
  how: { steps: Step[] };
  gateway: { stats: Array<{ figure: string; caption: string }> };
  contact: { cities: Array<{ city: string; lines: string[] }> };
};

function Marker({ children }: { children: ReactNode }) {
  return (
    <Container>
      <p dir="ltr" className="m-0 border-t border-dashed border-stone/60 pb-2 pt-6 font-sans text-[11px] uppercase tracking-label text-stone">
        {children}
      </p>
    </Container>
  );
}

export default async function ComponentsReview({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const m = (await getMessages()) as unknown as Messages;

  const credits = [
    { k: t("team.label"), v: t("about.title") },
    ...m.contact.cities.map((c) => ({ k: c.city, v: c.lines[0] ?? "" })),
    { k: t("footer.contact"), v: t("footer.email") },
  ];

  return (
    <>
      <Marker>Buttons</Marker>
      <Container className="flex flex-wrap items-center gap-4 py-6">
        <ButtonLink href="/contact" variant="blue">{t("packages.cta")}</ButtonLink>
        <Button variant="outline-blue">{t("cookie.decline")}</Button>
      </Container>
      <Section tone="blue" innerClassName="!py-10 flex flex-wrap items-center gap-4">
        <ButtonLink href="/contact" variant="gold">{t("ctaBand.cta")}</ButtonLink>
        <ButtonLink href="/contact" variant="gold-light">{t("nav.cta")}</ButtonLink>
        <ButtonLink href="/contact" variant="gold-gradient-pill">{t("hero.cta1")}</ButtonLink>
        <ButtonLink href="/how-it-works" variant="outline-gold">{t("hero.cta2")}</ButtonLink>
      </Section>

      <Marker>SectionHeading · light h1, dark immersive h2</Marker>
      <Section innerClassName="!py-12">
        <SectionHeading as="h1" label={t("nav.services")} title={t("services.title")} intro={t("services.intro")} />
      </Section>
      <Section tone="blue-deep" immersive innerClassName="!py-12">
        <SectionHeading
          tone="dark"
          immersive
          align="center"
          label={t("how.label")}
          title={t("how.title")}
          intro={t("how.intro")}
        />
      </Section>

      <Marker>PackageCard · light</Marker>
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 py-6">
        {m.packages.items.map((p, i) => (
          <PackageCard key={p.name} pkg={p} index={i} />
        ))}
      </Container>

      <Marker>PackageCard · glass and raised</Marker>
      <Section tone="blue-deep" immersive innerClassName="!py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-stretch gap-6">
          {m.packages.items.map((p, i) => (
            <PackageCard key={p.name} pkg={p} index={i} variant={i === 1 ? "raised" : "glass"} />
          ))}
        </div>
      </Section>

      <Marker>SectorTile · light</Marker>
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 py-6">
        {m.sectors.items.map((s) => (
          <SectorTile key={s.id} sector={s} />
        ))}
      </Container>

      <Marker>SectorTile · glass</Marker>
      <section className="bg-[radial-gradient(ellipse_70%_60%_at_30%_100%,theme(colors.blue.lift)_0%,theme(colors.blue.deep)_70%)] text-pearl">
        <Container className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[18px] py-12">
          {m.sectors.items.map((s) => (
            <SectorTile key={s.id} sector={s} variant="glass" />
          ))}
        </Container>
      </section>

      <Marker>JourneySteps · dark (milestones light up in turn)</Marker>
      <Section tone="blue-deep" innerClassName="!py-12">
        <JourneySteps steps={m.how.steps} />
      </Section>

      <Marker>JourneySteps · light</Marker>
      <Container className="py-12">
        <JourneySteps steps={m.how.steps} variant="light" />
      </Container>

      <Marker>StatCard</Marker>
      <Section tone="blue" innerClassName="!py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
          {m.gateway.stats.map((s) => (
            <StatCard key={s.caption} {...s} />
          ))}
        </div>
      </Section>

      <Marker>CreditsList</Marker>
      <Section tone="blue" innerClassName="!py-12 flex justify-center">
        <CreditsList items={credits} />
      </Section>

      <Marker>DiamondList · ImagePlaceholder</Marker>
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 py-6">
        <DiamondList items={m.packages.items[2]?.includes ?? []} />
        <ImagePlaceholder note="Team photo" />
        <ImagePlaceholder note="Night skyline" ratio="16 / 9" tone="dark" />
      </Container>

      <Marker>CtaBand</Marker>
      <CtaBand />
    </>
  );
}
