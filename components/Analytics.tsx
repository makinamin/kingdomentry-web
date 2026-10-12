"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

const KEY = "ke-consent";

function load() {
  if (document.getElementById("plausible")) return;
  const s = document.createElement("script");
  s.id = "plausible";
  s.defer = true;
  s.src = "https://plausible.io/js/script.js";
  s.dataset.domain = site.analyticsDomain;
  document.head.appendChild(s);
}

/** Loads Plausible only after the visitor accepts in the cookie notice. */
export function Analytics() {
  useEffect(() => {
    if (!site.analyticsDomain) return;
    try {
      if (localStorage.getItem(KEY) === "accepted") load();
    } catch {
      // Storage blocked: wait for an explicit choice.
    }
    const onChoice = (e: Event) => {
      if ((e as CustomEvent<string>).detail === "accepted") load();
    };
    window.addEventListener("ke-consent", onChoice);
    return () => window.removeEventListener("ke-consent", onChoice);
  }, []);
  return null;
}
