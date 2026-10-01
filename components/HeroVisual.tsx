import { useTranslations } from "next-intl";
import { MarkShapes } from "./Logo";

/**
 * Right side of the home hero: a tilted screen, Gilroy's laptop moment,
 * showing the route from Europe to the Kingdom in four steps.
 */
export function HeroVisual({ steps, cities }: { steps: Array<{ name: string }>; cities: string[] }) {
  const t = useTranslations("hero");
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[600px] [perspective:1600px]">
      <div className="animate-float">
        <div className="relative rounded-[22px] border border-white/15 bg-white/[0.06] p-3 shadow-[0_60px_120px_rgba(0,0,0,0.55)] backdrop-blur-md [transform:rotateY(-14deg)_rotateX(8deg)_rotateZ(-6deg)] rtl:[transform:rotateY(14deg)_rotateX(8deg)_rotateZ(6deg)]">
          <div className="relative overflow-hidden rounded-[14px] bg-[linear-gradient(150deg,theme(colors.night.soft),theme(colors.night.deep))] p-7">
            <span className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-violet/50 blur-[60px]" />
            <span className="absolute -bottom-20 -start-10 h-48 w-48 rounded-full bg-ember/40 blur-[60px]" />
            <div className="relative flex items-center justify-between">
              <svg viewBox="0 0 120 120" className="h-9 w-9 text-white">
                <MarkShapes mark="currentColor" diamond="currentColor" />
              </svg>
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-gd-violet" />
              </span>
            </div>
            <p className="relative m-0 mt-8 text-[13px] font-semibold uppercase tracking-label text-white/60">{t("label")}</p>
            <div dir="ltr" className="relative mt-5 flex items-center justify-between gap-2">
              {cities.map((c, i) => (
                <div key={c} className="flex flex-1 items-center gap-2 last:flex-none">
                  <span className="whitespace-nowrap rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-bold text-white">{c}</span>
                  {i < cities.length - 1 ? (
                    <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.5),theme(colors.violet.DEFAULT))]" />
                  ) : null}
                </div>
              ))}
            </div>
            <ol className="relative m-0 mt-8 grid list-none grid-cols-2 gap-3 p-0">
              {steps.map((s, i) => (
                <li
                  key={s.name}
                  className={`rounded-xl p-4 ${i === 1 ? "bg-gd-violet" : "border border-white/10 bg-white/[0.04]"}`}
                >
                  <span className="block text-[12px] font-bold text-white/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block text-[18px] font-black text-white">{s.name}</span>
                  <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full bg-white/80"
                      style={{ width: `${[100, 70, 35, 12][i] ?? 0}%` }}
                    />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mx-auto h-4 w-[86%] rounded-b-[30px] bg-white/10 [transform:rotateZ(-6deg)] rtl:[transform:rotateZ(6deg)]" />
      </div>
    </div>
  );
}
