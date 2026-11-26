import type { MetadataRoute } from "next";

import { defaultLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { createClient } from "@/prismicio";

/**
 * Lists every published page. English and Spanish share each address, so each
 * page appears once. Publishing in Prismic refreshes this list through the
 * same cache tag as the pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const [home, pages] = await Promise.all([
    client.getSingle("home", { lang: defaultLocale }),
    client.getAllByType("page", { lang: defaultLocale }),
  ]);

  return [home, ...pages].flatMap((document) =>
    document.url
      ? [
          {
            url: new URL(document.url, siteUrl).href,
            lastModified: new Date(document.last_publication_date),
          },
        ]
      : [],
  );
}
