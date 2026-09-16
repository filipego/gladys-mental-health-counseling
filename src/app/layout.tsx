import type { Metadata } from "next";
import localFont from "next/font/local";

import { createClient } from "@/prismicio";

import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const inter = localFont({
  src: "../../prototypes/pages/assets/inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Gladys Henriquez",
  description:
    "Mental health counseling for parents, teens, and adults in New York.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => null);

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader settings={settings?.data ?? null} />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <SiteFooter settings={settings?.data ?? null} />
      </body>
    </html>
  );
}
