import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;

// Build-time OG card in the Phase Space language: dark field, mono kicker,
// display title, single accent rule, domain line. No motif (locked).
export async function phaseSpaceCard(opts: { kicker: string; title: string }): Promise<ImageResponse> {
  const [archivo, plex] = await Promise.all([
    readFile(join(process.cwd(), "lib/og/Archivo-Bold.ttf")),
    readFile(join(process.cwd(), "lib/og/IBMPlexMono-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#050F0E",
          color: "#E4EDE9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontFamily: "plex", fontWeight: 500, fontSize: 26, letterSpacing: 8, color: "#7E918D" }}>
          {opts.kicker.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "archivo", fontWeight: 700, fontSize: 100, lineHeight: 1.05, letterSpacing: -2 }}>
            {opts.title.toUpperCase()}
          </div>
          <div style={{ display: "flex", marginTop: 40, width: 160, height: 6, backgroundColor: "#3FDCBE" }} />
        </div>
        <div style={{ display: "flex", fontFamily: "plex", fontWeight: 500, fontSize: 24, letterSpacing: 4, color: "#61736F" }}>
          REHANK.IN
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "archivo", data: archivo, weight: 700, style: "normal" },
        { name: "plex", data: plex, weight: 500, style: "normal" },
      ],
    },
  );
}
