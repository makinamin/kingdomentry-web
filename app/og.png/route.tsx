import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Share card: royal blue, white mark and wordmark, the line from the content doc.
export function GET() {
  const lines = Array.from({ length: 14 }, (_, i) => i);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(180deg, #043DC3 0%, #003DA5 55%, #021D5E 100%)",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Hairline skyline hint */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: 26, padding: "0 60px", opacity: 0.22 }}>
          {lines.map((i) => (
            <div key={i} style={{ width: 1, height: 160 + ((i * 97) % 300), background: "#FFFFFF" }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="64" height="64" viewBox="0 0 120 120">
            <rect x="12" y="12" width="24" height="96" fill="#FFFFFF" />
            <polygon points="44,12 108,12 44,58" fill="#FFFFFF" />
            <polygon points="44,62 108,108 44,108" fill="#FFFFFF" />
            <rect x="80" y="54" width="12" height="12" transform="rotate(45 86 60)" fill="#B18767" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, letterSpacing: 6 }}>
            <span style={{ fontWeight: 700 }}>KINGDOM</span>
            <span style={{ fontWeight: 300 }}>ENTRY</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -3, maxWidth: 900 }}>The Kingdom is open. Enter it right.</div>
          <div style={{ fontSize: 24, letterSpacing: 4, opacity: 0.8 }}>SOFT LANDING · SAUDI ARABIA · AMSTERDAM · CASABLANCA · JEDDAH</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
