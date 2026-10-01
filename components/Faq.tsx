import { Reveal } from "./Reveal";

/** Native disclosure list: works without JavaScript, keyboard and screen-reader friendly. */
export function Faq({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <div className="border-t border-line">
      {items.map((it, i) => (
        <Reveal key={it.q} delay={Math.min(i, 6) * 50}>
          <details className="group border-b border-line" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start gap-6 py-7 text-navy marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="w-8 shrink-0 pt-1 text-[13px] text-navy/45">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-h6 text-navy">{it.q}</span>
              <span aria-hidden className="relative mt-2 h-4 w-4 shrink-0">
                <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                <span className="absolute inset-y-0 start-1/2 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>
            <p className="m-0 max-w-[70ch] pb-8 ps-14 text-[16px] leading-relaxed text-navy/75">{it.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
