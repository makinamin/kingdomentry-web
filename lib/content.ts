import { getMessages } from "next-intl/server";
import type { Founder, Item, Office, Package, Sector, Service } from "./types";

/** Typed view of the list-shaped parts of messages/*.json. */
export type Content = {
  home: { intro: { pains: string[] }; pillars: { items: Item[] }; serve: { items: string[] } };
  why: { reasons: { items: Item[] }; rules: { items: Array<Item & { tag: string }> }; programs: { items: Item[] } };
  sectors: { items: Sector[] };
  services: { items: Service[] };
  how: { steps: Item[]; packages: { items: Package[] } };
  about: { story: { paragraphs: string[] }; values: { items: Item[] }; founders: { items: Founder[] } };
  offices: { items: Office[] };
  faq: { items: Array<{ q: string; a: string }> };
  privacy: { sections: Array<{ title: string; text: string }> };
  closing: string[];
};

export async function getContent() {
  return (await getMessages()) as unknown as Content;
}
