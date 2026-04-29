import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { AmbientFX } from "@/components/AmbientFX";
import { BodyClass } from "@/components/BodyClass";
import { BtnLabels } from "@/components/BtnLabels";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import {
  jsonLdScript,
  localBusinessJsonLd,
  organizationJsonLd,
  personJsonLd,
  servicesJsonLd,
} from "@/lib/jsonld";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Lifestyle brand design studio · ${site.country}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} — Lifestyle brand design studio`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Lifestyle brand design studio`,
    description: site.description,
  },
  alternates: {
    canonical: site.url,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070710" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrains.variable}`}>
      <body>
        {/* Set body.home-dark before first paint so the home nav doesn't
            flash light theme on hard refresh. BodyClass keeps it in sync
            during client-side navigation. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(location.pathname==='/')document.body.classList.add('home-dark');}catch(e){}`,
          }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <BodyClass />
        <AmbientFX />
        <Nav />
        {children}
        <Footer />
        <Reveal />
        <BtnLabels />
        <script {...jsonLdScript(organizationJsonLd)} />
        <script {...jsonLdScript(personJsonLd)} />
        <script {...jsonLdScript(localBusinessJsonLd)} />
        <script {...jsonLdScript(servicesJsonLd)} />
      </body>
    </html>
  );
}
