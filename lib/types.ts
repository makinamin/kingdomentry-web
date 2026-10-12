import type { SectorId } from "@/components/SectorIcon";

export type Item = { name: string; text: string };
export type Sector = { id: SectorId; name: string; demand: string; fit: string[] };
export type Service = { name: string; tagline: string; points: string[] };
export type Package = { name: string; for: string; get: string[] };
export type Founder = { name: string; title: string; location: string; bio: string[]; quote: string };
export type Office = { city: string; role: string; text: string; address: string; phone: string; email: string };
