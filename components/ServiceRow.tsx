import type { Service } from "@/lib/types";
import { Reveal } from "./Reveal";

/** One of the twelve service lines: number, name and promise, then the points in hairline rows. */
export function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal className="grid gap-6 border-t border-line py-[clamp(36px,4vw,60px)] lg:grid-cols-[100px_1fr_1.2fr] lg:gap-12">
      <p className="m-0 text-[clamp(40px,3.6vw,60px)] font-light leading-none tracking-[-0.06em] text-royal">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div>
        <h3 className="m-0 text-h5 text-navy">{service.name}</h3>
        <p className="m-0 mt-3 text-[17px] text-navy/65">{service.tagline}</p>
      </div>
      <ul className="m-0 list-none border-t border-line p-0 lg:border-t-0">
        {service.points.map((p) => (
          <li key={p} className="flex items-start gap-3 border-b border-line py-3 text-[15px] leading-snug text-navy">
            <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-royal" />
            {p}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
