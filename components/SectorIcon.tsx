// Line icons, 1.5px strokes with a small diamond accent. Colour follows currentColor.
// The first five come from the handoff's assets/icons; the rest are drawn to match.
const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const diamond = (x: number, y: number, size = 5) => (
  <rect x={x - size / 2} y={y - size / 2} width={size} height={size} transform={`rotate(45 ${x} ${y})`} fill="currentColor" />
);

const paths = {
  healthcare: (
    <>
      <g {...s}>
        <circle cx="24" cy="26" r="14" />
        <path d="M24 18v16M16 26h16" />
      </g>
      {diamond(37.5, 7.5)}
    </>
  ),
  cleantech: (
    <>
      <g {...s}>
        <path d="M24 6c6 8 10 13 10 19a10 10 0 0 1-20 0c0-6 4-11 10-19z" />
        <path d="M9 42c3-3 6-3 9 0s6 3 9 0 6-3 9 0" />
      </g>
      {diamond(24, 27)}
    </>
  ),
  ai: (
    <>
      <g {...s}>
        <circle cx="11" cy="12" r="3" />
        <circle cx="37" cy="12" r="3" />
        <circle cx="11" cy="36" r="3" />
        <circle cx="37" cy="36" r="3" />
        <path d="M13.2 14.2 20.5 21M34.8 14.2 27.5 21M13.2 33.8 20.5 27M34.8 33.8 27.5 27" />
      </g>
      {diamond(24, 24, 7)}
    </>
  ),
  agrifood: (
    <>
      <g {...s}>
        <path d="M24 42V18" />
        <path d="M24 30c-8 0-12-5-12-13 7 0 12 5 12 13z" />
        <path d="M24 24c8 0 12-5 12-13-7 0-12 5-12 13z" />
        <path d="M12 42h24" />
      </g>
      {diamond(24, 8.5)}
    </>
  ),
  industry: (
    <>
      <g {...s}>
        <path d="M8 40V22l8 6v-6l8 6v-6l8 6V16h8v24z" />
        <path d="M6 40h36" />
      </g>
      {diamond(12, 11.5)}
    </>
  ),
  logistics: (
    <>
      <g {...s}>
        <path d="M6 30h36l-5 9H11z" />
        <path d="M12 30v-8h10v8M22 30V18h10v12" />
        <path d="M5 43c3-2 6-2 9 0s6 2 9 0 6-2 9 0 6 2 9 0" />
      </g>
      {diamond(38, 12)}
    </>
  ),
  tourism: (
    <>
      <g {...s}>
        <path d="M24 42V20" />
        <path d="M24 20c-3-6-9-8-14-6 5 1 9 3 14 6zM24 20c3-6 9-8 14-6-5 1-9 3-14 6zM24 20c-5-2-10 1-12 6 4-3 8-5 12-6zM24 20c5-2 10 1 12 6-4-3-8-5-12-6z" />
        <path d="M10 42h28" />
      </g>
      {diamond(37, 7)}
    </>
  ),
  construction: (
    <>
      <g {...s}>
        <path d="M14 42V10h4v32M14 10h26M18 10l-4 6M40 10v8" />
        <path d="M36 18h8v6h-8zM8 42h16M14 16l4 4m-4 4 4 4m-4 4 4 4" />
      </g>
      {diamond(28, 34)}
    </>
  ),
  education: (
    <>
      <g {...s}>
        <path d="M4 18 24 9l20 9-20 9z" />
        <path d="M12 22v10c0 3 5 6 12 6s12-3 12-6V22" />
        <path d="M44 18v12" />
      </g>
      {diamond(44, 34)}
    </>
  ),
  fintech: (
    <>
      <g {...s}>
        <rect x="6" y="13" width="36" height="24" rx="2" />
        <path d="M6 20h36M12 30h8" />
        <circle cx="34" cy="29" r="4" />
      </g>
      {diamond(38, 7)}
    </>
  ),
} as const;

export type SectorId = keyof typeof paths;

export const sectorIds = Object.keys(paths) as SectorId[];

export function SectorIcon({ id, size = 48 }: { id: SectorId; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden className="shrink-0">
      {paths[id] ?? paths.industry}
    </svg>
  );
}
