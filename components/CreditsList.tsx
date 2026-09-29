export type Credit = { k: string; v: string };

/** Film-credit style list: labels aligned to the end, values to the start. */
export function CreditsList({ items }: { items: Credit[] }) {
  return (
    <dl className="m-0 grid grid-cols-[max-content_max-content] items-baseline gap-x-6 gap-y-3 text-start">
      {items.map((c) => (
        <div key={`${c.k}-${c.v}`} className="contents">
          <dt className="text-end text-[12px] font-medium uppercase tracking-label text-horizon">{c.k}</dt>
          <dd className="m-0 text-[15px] text-pearl">{c.v}</dd>
        </div>
      ))}
    </dl>
  );
}
