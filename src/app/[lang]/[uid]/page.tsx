import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { defaultLocale, isLocale, locales } from "@/lib/i18n";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

/** A Spanish page falls back to the English one until it exists. */
async function getPage(lang: string, uid: string) {
  if (!isLocale(lang)) notFound();
  const client = createClient();
  return client
    .getByUID("page", uid, { lang })
    .catch(() => (lang === defaultLocale ? notFound() : client.getByUID("page", uid)))
    .catch(() => notFound());
}

export default async function Page({ params }: PageProps<"/[lang]/[uid]">) {
  const { lang, uid } = await params;
  const page = await getPage(lang, uid);

  return (
    <SliceZone
      components={components}
      context={{ pageUid: uid, lang }}
      slices={page.data.slices}
    />
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[uid]">): Promise<Metadata> {
  const { lang, uid } = await params;
  const page = await getPage(lang, uid);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page", { lang: "*" });
  const uids = [...new Set(pages.flatMap((page) => (page.uid ? [page.uid] : [])))];

  return locales.flatMap((lang) => uids.map((uid) => ({ lang, uid })));
}
