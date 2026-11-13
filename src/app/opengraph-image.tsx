import { ImageResponse } from "next/og";

export const alt = "Pathfinder Grow: get found, get chosen, grow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F0E6",
          color: "#0D1B16",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, letterSpacing: 4, textTransform: "uppercase" }}>
          Pathfinder Grow · Digital growth studio
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 124, lineHeight: 1, letterSpacing: -4 }}>
          <span style={{ fontWeight: 300 }}>Get found.</span>
          <span style={{ fontWeight: 300 }}>Get chosen.</span>
          <span style={{ fontWeight: 800, color: "#0B4A38" }}>Grow.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#46564E" }}>
          SEO and AI visibility, brand, websites and automation
        </div>
      </div>
    ),
    size
  );
}
