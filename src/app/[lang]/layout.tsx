import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { PrismicPreview } from "@prismicio/next";

import {
  defaultLocale,
  getDictionary,
  htmlLang,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";
import { createClient, repositoryName } from "@/prismicio";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import "../globals.css";

const inter = localFont({
  src: "../../../prototypes/pages/assets/inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: "Gladys Henriquez",
    description: getDictionary(isLocale(lang) ? lang : defaultLocale).siteDescription,
  };
}

/** The Spanish settings fall back to the English ones until they exist. */
async function getSettings(lang: Locale) {
  const client = createClient();
  return client
    .getSingle("settings", { lang })
    .catch(() => (lang === defaultLocale ? null : client.getSingle("settings")))
    .catch(() => null);
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const settings = await getSettings(lang);

  return (
    <html lang={htmlLang(lang)} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader lang={lang} settings={settings?.data ?? null} />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <SiteFooter lang={lang} settings={settings?.data ?? null} />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
