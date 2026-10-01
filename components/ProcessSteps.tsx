import { Reveal } from "./Reveal";

export type Step = { name: string; text: string };

/** Four steps with oversized outlined numbers and a gradient rail. */
export function ProcessSteps({ steps, tone = "light" }: { steps: Step[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="relative m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal key={s.name} as="li" delay={i * 120} className="relative">
          <div
            className={`group relative h-full overflow-hidden rounded-xl p-8 transition-colors duration-500 ${
              dark ? "border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]" : "bg-white shadow-card"
            }`}
          >
            <span
              aria-hidden
              className={`block text-[96px] font-black leading-none ${dark ? "text-white/25" : "text-ink/15"} text-stroke transition-colors duration-500 group-hover:text-violet`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="mt-6 block h-1 w-14 rounded-full bg-gd-violet transition-[width] duration-500 group-hover:w-24" />
            <h3 className={`m-0 mt-6 text-[26px] font-black leading-tight ${dark ? "!text-white" : ""}`}>{s.name}</h3>
            <p className={`m-0 mt-3 text-[16px] leading-relaxed ${dark ? "text-white/70" : "text-ink-3"}`}>{s.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
