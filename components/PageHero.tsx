import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DotGrid, Glow } from "./Glow";
import { Eyebrow } from "./Heading";

/** Dark banner at the top of inner pages: eyebrow, big title, breadcrumb. */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
}: {
  label?: string;
  title: string;
  intro?: string;
  crumbs: Array<{ label: string; href?: string }>;
}) {
  const t = useTranslations("nav");
  return (
    <section className="relative overflow-hidden bg-night pb-[clamp(70px,9vw,130px)] pt-[clamp(170px,18vw,250px)] text-white">
      <Glow className="-start-40 top-10 h-[420px] w-[420px]" />
      <Glow tone="ember" className="-bottom-40 end-[10%] h-[300px] w-[300px] opacity-60" />
      <DotGrid className="end-0 top-0 h-full w-1/2 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="relative mx-auto w-full max-w-site px-6">
        {label ? <Eyebrow tone="dark">{label}</Eyebrow> : null}
        <h1 className="m-0 mt-4 max-w-[16ch] text-balance text-[clamp(40px,6vw,90px)] font-black leading-[1.02] tracking-[-0.01em] !text-white">
          {title}
        </h1>
        {intro ? <p className="m-0 mt-6 max-w-[58ch] text-[18px] text-white/75">{intro}</p> : null}
        <nav aria-label="Breadcrumb" className="mt-10">
          <ol className="m-0 flex list-none flex-wrap items-center gap-3 p-0 text-[15px] font-medium">
            <li>
              <Link href="/" className="text-white/70 no-underline hover:text-white">
                {t("home")}
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gd-violet" />
                {c.href ? (
                  <Link href={c.href} className="text-white/70 no-underline hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
