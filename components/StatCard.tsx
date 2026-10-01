/** Big figure + caption. Figures are placeholders until sourced. */
export function StatCard({ figure, caption }: { figure: string; caption: string }) {
  return (
    <div className="flex h-full min-w-0 flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-7">
      <p className="text-gradient m-0 break-words text-[clamp(20px,2vw,32px)] font-black leading-[1.1]">
        {figure}
      </p>
      <p className="m-0 text-[15px] leading-snug text-white/75">{caption}</p>
    </div>
  );
}
