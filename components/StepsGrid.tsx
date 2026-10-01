import type { Step } from "@/lib/types";
import { Reveal } from "./Reveal";

/** Four columns divided by hairlines, light oversized numbers. */
export function StepsGrid({ steps, tone = "light" }: { steps: Step[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className={`m-0 grid list-none grid-cols-1 border-t p-0 sm:grid-cols-2 lg:grid-cols-4 ${dark ? "border-white/25" : "border-line"}`}>
      {steps.map((s, i) => (
        <Reveal
          key={s.name}
          as="li"
          delay={i * 110}
          className={`flex flex-col gap-4 border-b py-10 sm:px-8 sm:first:ps-0 lg:border-b-0 lg:border-e lg:last:border-e-0 ${
            dark ? "border-white/25" : "border-line"
          }`}
        >
          <span className={`text-[clamp(56px,5vw,84px)] font-light leading-none tracking-[-0.06em] ${dark ? "text-white" : "text-royal"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`m-0 mt-6 text-h5 ${dark ? "text-white" : "text-navy"}`}>{s.name}</h3>
          <p className={`m-0 text-[15px] leading-relaxed ${dark ? "text-white/75" : "text-navy/70"}`}>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
