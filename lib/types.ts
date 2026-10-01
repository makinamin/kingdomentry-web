import type { SectorId } from "@/components/SectorIcon";

export type Package = { name: string; duration: string; includes: string[]; outcome: string };
export type Step = { name: string; text: string };
export type Sector = {
  id: SectorId;
  name: string;
  tagline: string;
  opportunity: string;
  buyers: string[];
  help: string[];
};
