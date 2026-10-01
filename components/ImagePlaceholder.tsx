import { MarkShapes } from "./Logo";

/**
 * Stand-in for photography that has not arrived yet. Reserves the aspect ratio
 * so the real image causes no layout shift. The note says which photo goes here.
 */
export function ImagePlaceholder({
  note,
  ratio = "4 / 5",
  className = "",
  rounded = "rounded-xl",
}: {
  note: string;
  ratio?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      role="img"
      aria-label={note}
      className={`relative isolate flex items-center justify-center overflow-hidden bg-[linear-gradient(140deg,theme(colors.night.soft)_0%,theme(colors.night.DEFAULT)_55%,theme(colors.indigo)_160%)] ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span aria-hidden className="absolute -end-10 -top-10 -z-10 h-1/2 w-1/2 rounded-full bg-violet/50 blur-[60px]" />
      <svg viewBox="0 0 120 120" aria-hidden className="h-[34%] w-[34%] text-white opacity-[0.14]">
        <MarkShapes mark="currentColor" diamond="currentColor" />
      </svg>
      <span className="absolute bottom-4 start-4 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/70 backdrop-blur">
        {note}
      </span>
    </div>
  );
}
