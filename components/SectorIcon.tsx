// Line icons from assets/icons/sector-*.svg: 1.5px strokes with a diamond accent. Colour follows currentColor.
const gold = "currentColor";
const paths = {
  medical: (
    <>
      <g fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round"><circle cx="24" cy="26" r="14" /><path d="M24 18v16M16 26h16" /></g><rect x="35" y="5" width="5" height="5" transform="rotate(45 37.5 7.5)" fill={gold} />
    </>
  ),
  cleantech: (
    <>
      <g fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round"><path d="M24 6c6 8 10 13 10 19a10 10 0 0 1-20 0c0-6 4-11 10-19z" /><path d="M9 42c3-3 6-3 9 0s6 3 9 0 6-3 9 0" /></g><rect x="21.5" y="24.5" width="5" height="5" transform="rotate(45 24 27)" fill={gold} />
    </>
  ),
  ai: (
    <>
      <g fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="12" r="3" /><circle cx="37" cy="12" r="3" /><circle cx="11" cy="36" r="3" /><circle cx="37" cy="36" r="3" /><path d="M13.2 14.2 20.5 21M34.8 14.2 27.5 21M13.2 33.8 20.5 27M34.8 33.8 27.5 27" /></g><rect x="20.5" y="20.5" width="7" height="7" transform="rotate(45 24 24)" fill={gold} />
    </>
  ),
  agri: (
    <>
      <g fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M24 42V18" /><path d="M24 30c-8 0-12-5-12-13 7 0 12 5 12 13z" /><path d="M24 24c8 0 12-5 12-13-7 0-12 5-12 13z" /><path d="M12 42h24" /></g><rect x="21.5" y="6" width="5" height="5" transform="rotate(45 24 8.5)" fill={gold} />
    </>
  ),
  industry: (
    <>
      <g fill="none" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 40V22l8 6v-6l8 6v-6l8 6V16h8v24z" /><path d="M6 40h36" /></g><rect x="9.5" y="9" width="5" height="5" transform="rotate(45 12 11.5)" fill={gold} />
    </>
  ),
} as const;

export type SectorId = keyof typeof paths;

export const sectorIds = Object.keys(paths) as SectorId[];

export function SectorIcon({ id, size = 48 }: { id: SectorId; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden className="shrink-0">
      {paths[id]}
    </svg>
  );
}
