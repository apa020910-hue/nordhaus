import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#1c1e1c",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#f4f5f2", fontSize: 44, letterSpacing: 6, fontWeight: 700 }}>
            NORDHAUS
          </div>
          <div style={{ display: "flex", marginTop: 10, color: "#b6481a", fontSize: 22, letterSpacing: 3 }}>
            CONSTRUCTION &amp; RENOVATION
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ display: "flex", color: "#f4f5f2", fontSize: 60, lineHeight: 1.12 }}>
            Built properly. Built to last.
          </div>
          <div style={{ display: "flex", marginTop: 26, color: "rgba(244,245,242,0.6)", fontSize: 27 }}>
            Rīga · Latvia
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
