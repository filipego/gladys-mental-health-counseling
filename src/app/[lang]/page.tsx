import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { defaultLocale, isLocale } from "@/lib/i18n";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

/** The Spanish home page falls back to the English one until it exists. */
async function getHome(lang: string) {
  if (!isLocale(lang)) notFound();
  const client = createClient();
  return client
    .getSingle("home", { lang })
    .catch(() => (lang === defaultLocale ? notFound() : client.getSingle("home")))
    .catch(() => notFound());
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const page = await getHome(lang);

  return (
    <SliceZone
      components={components}
      context={{ pageUid: "home", lang }}
      slices={page.data.slices}
    />
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const page = await getHome(lang);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
