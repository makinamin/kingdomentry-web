import type { ReactNode } from "react";

/** Zeyna section label: a small outlined square, then the words. */
export function Label({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`m-0 flex items-center gap-3 text-[13px] font-medium ${tone === "dark" ? "text-white/75" : "text-navy/70"} ${className}`}>
      <span aria-hidden className={`h-2.5 w-2.5 shrink-0 border ${tone === "dark" ? "border-white/70" : "border-navy/60"}`} />
      {children}
    </p>
  );
}

/** Title that rises in line by line. Each line is a separate string. */
export function RiseTitle({
  lines,
  as: Tag = "h2",
  className = "",
}: {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Tag className={`m-0 ${className}`}>
      {lines.map((l, i) => (
        <span key={`${l}-${i}`} className="rise-line">
          <span className="animate-rise" style={{ animationDelay: `${120 + i * 110}ms` }}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Splits a title after its first full stop: "Crafting Landmarks. Defining Luxury." → two lines. */
export function splitTitle(title: string) {
  const cut = title.indexOf(".");
  if (cut < 0 || cut === title.length - 1) return [title];
  return [title.slice(0, cut + 1), title.slice(cut + 1).trim()];
}
