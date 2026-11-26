import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/** Every page is open to search engines and AI tools; the sitemap lists them. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/slice-simulator"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
