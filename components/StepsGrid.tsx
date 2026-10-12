import type { Item } from "@/lib/types";
import { Reveal } from "./Reveal";

/**
 * Below the column breakpoint each step is a row (number beside text) so an odd
 * count never leaves a lone card; columns only start once they are wide enough.
 * Five steps wait until xl, where each column still fits a readable line.
 */
const layout = {
  3: {
    ol: "lg:grid-cols-3",
    li: "lg:flex lg:border-b-0 lg:border-e lg:px-7 lg:py-10 lg:first:ps-0 lg:last:border-e-0 lg:last:pe-0",
    h: "lg:mt-6",
  },
  4: {
    ol: "lg:grid-cols-4",
    li: "lg:flex lg:border-b-0 lg:border-e lg:px-7 lg:py-10 lg:first:ps-0 lg:last:border-e-0 lg:last:pe-0",
    h: "lg:mt-6",
  },
  5: {
    ol: "xl:grid-cols-5",
    li: "xl:flex xl:border-b-0 xl:border-e xl:px-7 xl:py-10 xl:first:ps-0 xl:last:border-e-0 xl:last:pe-0",
    h: "xl:mt-6",
  },
} as const;

/** Columns divided by hairlines, light oversized numbers. */
export function StepsGrid({ steps, tone = "light", level = 3 }: { steps: Item[]; tone?: "light" | "dark"; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  const dark = tone === "dark";
  const l = layout[steps.length as keyof typeof layout] ?? layout[4];
  return (
    <ol className={`m-0 grid list-none grid-cols-1 border-t p-0 ${l.ol} ${dark ? "border-white/25" : "border-line"}`}>
      {steps.map((s, i) => (
        <Reveal
          key={s.name}
          as="li"
          delay={i * 100}
          className={`flex flex-col gap-4 border-b py-10 sm:grid sm:grid-cols-[minmax(110px,auto)_1fr] sm:gap-x-10 sm:gap-y-3 sm:py-9 ${l.li} ${
            dark ? "border-white/25" : "border-line"
          }`}
        >
          <span
            className={`text-[clamp(52px,4.6vw,80px)] font-light leading-none tracking-[-0.06em] sm:row-span-2 ${dark ? "text-white" : "text-royal"}`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <H className={`m-0 mt-6 text-h6 sm:mt-0 ${l.h} ${dark ? "text-white" : "text-navy"}`}>{s.name}</H>
          <p className={`m-0 max-w-[60ch] text-[15px] leading-relaxed ${dark ? "text-white/80" : "text-navy/70"}`}>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
