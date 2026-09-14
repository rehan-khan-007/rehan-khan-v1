import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const archivo = localFont({
  src: [{ path: "./fonts/archivo/Archivo-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
});

const plexMono = localFont({
  src: [
    { path: "./fonts/plex/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.positioningLabel}`, template: `%s — ${site.name}` },
  description: site.thesis,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${plexMono.variable} bg-bg text-ink font-display antialiased`}>
        {/* Marks JS as active BEFORE any hydrated content paints (ADR-005) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
