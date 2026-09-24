import { ImageResponse } from "next/og";
import { SITE } from "./lib/site";

export const alt = "Fortesa, Siguri dhe Teknologji";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (the renderer) needs each text run to be a single child, hence the template strings.
const SUMMARY = `Kamera sigurie, sisteme alarmi, instalime elektrike, GPS, porta automatike dhe zgjidhje për hoteleri ${SITE.serviceAreaText}.`;

/** Social-share image in the brand colors, generated at build time. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 84px",
          background: "#141414",
          color: "#f7f4ec",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <svg width="92" height="107" viewBox="0 0 100 116">
            <g fill="#c9a54a">
              <path d="M20 0h15v10h7.5V0h15v10H65V0h15v18l-8 8H28l-8-8z" />
              <path d="M31 30h38l7 54H24z" />
              <rect x="23" y="88" width="54" height="8" rx="2.5" />
              <rect x="17" y="100" width="66" height="12" rx="3" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: 12, color: "#c9a54a", lineHeight: 1 }}>
              FORTESA
            </div>
            <div style={{ marginTop: 14, fontSize: 24, letterSpacing: 10, color: "#e2c574" }}>
              SIGURI DHE TEKNOLOGJI
            </div>
          </div>
        </div>
        <div style={{ marginTop: 52, fontSize: 34, lineHeight: 1.4, maxWidth: 980, color: "#f7f4ec", opacity: 0.88 }}>
          {SUMMARY}
        </div>
        <div style={{ marginTop: 44, display: "flex", gap: 44, fontSize: 28, fontWeight: 700, color: "#c9a54a" }}>
          <span>{SITE.website}</span>
          <span>{SITE.phoneDisplay}</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, background: "#c9a54a" }} />
      </div>
    ),
    { ...size }
  );
}
