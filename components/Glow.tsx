/** Soft blurred colour blobs, Gilroy's background light. Purely decorative. */
export function Glow({ className = "", tone = "violet" }: { className?: string; tone?: "violet" | "ember" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[90px] ${
        tone === "violet" ? "bg-violet/40" : "bg-ember/50"
      } ${className}`}
    />
  );
}

/** Dotted grid texture used on dark bands. */
export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute bg-[radial-gradient(rgba(255,255,255,0.18)_1.2px,transparent_1.2px)] [background-size:22px_22px] ${className}`}
    />
  );
}
