import type { Item } from "@/lib/types";
import { Reveal } from "./Reveal";

const cols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" } as const;

/** Columns divided by hairlines, light oversized numbers. */
export function StepsGrid({ steps, tone = "light", level = 3 }: { steps: Item[]; tone?: "light" | "dark"; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  const dark = tone === "dark";
  const grid = cols[steps.length as keyof typeof cols] ?? "lg:grid-cols-4";
  return (
    <ol className={`m-0 grid list-none grid-cols-1 border-t p-0 sm:grid-cols-2 ${grid} ${dark ? "border-white/25" : "border-line"}`}>
      {steps.map((s, i) => (
        <Reveal
          key={s.name}
          as="li"
          delay={i * 100}
          className={`flex flex-col gap-4 border-b py-10 sm:px-7 sm:first:ps-0 lg:border-b-0 lg:border-e lg:last:border-e-0 ${
            dark ? "border-white/25" : "border-line"
          }`}
        >
          <span className={`text-[clamp(52px,4.6vw,80px)] font-light leading-none tracking-[-0.06em] ${dark ? "text-white" : "text-royal"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <H className={`m-0 mt-6 text-h6 ${dark ? "text-white" : "text-navy"}`}>{s.name}</H>
          <p className={`m-0 text-[15px] leading-relaxed ${dark ? "text-white/80" : "text-navy/70"}`}>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
