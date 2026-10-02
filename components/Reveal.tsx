import type { ReactNode } from "react";

/**
 * Fades and rises its content once it scrolls into view. Plain markup: one shared
 * observer (RevealObserver, mounted once in the layout) adds the "is-in" class,
 * so a page with dozens of these ships no extra JavaScript per block.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
