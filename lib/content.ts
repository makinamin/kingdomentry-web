import { getMessages } from "next-intl/server";
import type { Package } from "@/components/PackageCard";
import type { Step } from "@/components/ProcessSteps";
import type { Sector } from "@/components/SectorCard";

/** Typed view of the list-shaped parts of messages/*.json. */
export type Content = {
  packages: { items: Package[] };
  sectors: { items: Sector[] };
  how: { steps: Step[] };
  gateway: { stats: Array<{ figure: string; caption: string }> };
  whyNow: { points: Array<{ title: string; text: string }> };
  about: { story: string[]; members: Array<{ name: string; role: string; photo: string; linkedin: string }> };
  contact: { cities: Array<{ city: string; lines: string[] }> };
  privacy: { sections: Array<{ title: string; text: string }> };
};

export async function getContent() {
  return (await getMessages()) as unknown as Content;
}
