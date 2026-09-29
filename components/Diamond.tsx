/** Square rotated 45°. Bullets are 7px, card markers 9px, milestones 13 to 17px. */
export function Diamond({ size = 7, className = "bg-gold" }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 rotate-45 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Diamond-bulleted list used in package cards and sector detail. */
export function DiamondList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`m-0 flex list-none flex-col gap-2.5 p-0 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3">
          <Diamond className="relative -top-0.5 bg-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
