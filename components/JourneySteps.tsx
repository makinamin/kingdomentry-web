export type Step = { name: string; text: string };

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * dark: immersive home. A gradient gold line runs across the top and each
 * 13px milestone lights up in turn (8s loop, 1.2s stagger).
 * light: how-it-works page. Solid gold rule with 17px diamonds.
 */
export function JourneySteps({ steps, variant = "dark" }: { steps: Step[]; variant?: "dark" | "light" }) {
  if (variant === "light") {
    return (
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 border-t border-gold p-0">
        {steps.map((s, i) => (
          <li key={s.name} className="relative flex flex-col gap-3 pt-11">
            <span aria-hidden className="absolute -top-[9px] start-0 h-[17px] w-[17px] rotate-45 bg-gold" />
            <p className="m-0 text-[20px] font-light text-ink-soft">{num(i)}</p>
            <h2 className="m-0 text-[clamp(32px,3vw,44px)] font-medium leading-[1.05]">{s.name}</h2>
            <p className="m-0 text-pretty text-[17px] text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-2 h-px bg-[linear-gradient(90deg,transparent,rgba(210,180,151,0.6)_15%,rgba(210,180,151,0.6)_85%,transparent)]"
      />
      <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 gap-y-9 p-0">
        {steps.map((s, i) => (
          <li key={s.name} className="relative flex flex-col gap-2.5 pt-10">
            <span
              aria-hidden
              className="absolute start-0 top-0.5 h-[13px] w-[13px] rotate-45 animate-milestone bg-gold-deep"
              style={{ animationDelay: `${i * 1.2}s` }}
            />
            <p className="m-0 text-[12px] font-medium tracking-label text-horizon">{num(i)}</p>
            <h3 className="m-0 text-[32px] font-medium leading-[1.05] text-gold-light">{s.name}</h3>
            <p className="m-0 text-pretty text-[15.5px] font-light leading-[1.7] text-pearl">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

