/** Glass proof card on blue. Figure stays on one line and truncates. */
export function StatCard({ figure, caption }: { figure: string; caption: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-lg border border-gold-light/[0.22] bg-pearl/[0.04] px-[18px] py-6">
      <span aria-hidden className="h-[9px] w-[9px] rotate-45 bg-gold-light shadow-[0_0_14px_rgba(210,180,151,0.6)]" />
      <p title={figure} className="m-0 truncate text-[clamp(16px,1.6vw,30px)] font-light leading-none text-gold-light">
        {figure}
      </p>
      <p className="m-0 text-pretty text-[14px] font-light text-pearl">{caption}</p>
    </div>
  );
}
