import type { SettingsDocument } from "../../../prismicio-types";

import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

type StructuredDataProps = {
  lang: Locale;
  settings: SettingsDocument["data"] | null;
};

/** Facts that have no Prismic field. They match the site's credential and supervision copy. */
const facts = {
  name: "Gladys Henriquez",
  practice: "Being Unbound Mental Health Counseling, PLLC",
  "en-us": {
    jobTitle: "Mental Health Counselor, Limited Permit (MHC-LP)",
    service: "Mental health counseling",
    inPerson: "In-person counseling",
    telehealth: "Telehealth counseling for clients located in New York",
  },
  "es-us": {
    jobTitle: "Consejera de Salud Mental con Permiso Limitado (MHC-LP)",
    service: "Consejería de salud mental",
    inPerson: "Consejería en persona",
    telehealth: "Consejería por telesalud para clientes ubicados en Nueva York",
  },
} as const;

/** "55 Broadway, New York, NY 10006" as a postal address; other formats stay as written. */
function postalAddress(address: string) {
  const match = address.match(/^(.+),\s*(.+),\s*([A-Z]{2})\s+(\d{5})$/);
  if (!match) return address;
  const [, streetAddress, addressLocality, addressRegion, postalCode] = match;
  return {
    "@type": "PostalAddress",
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry: "US",
  };
}

/**
 * Tells search engines and AI tools who Gladys is, where she sees clients and
 * in which languages, as schema.org JSON-LD. Address and service wording come
 * from the Prismic settings (footer fields).
 */
export function StructuredData({ lang, settings }: StructuredDataProps) {
  const text = facts[lang];
  const address = settings?.footer_address ? postalAddress(settings.footer_address) : null;
  const place = address ? { "@type": "Place", address } : null;
  const ids = {
    website: `${siteUrl}/#website`,
    person: `${siteUrl}/#gladys`,
    practice: `${siteUrl}/#practice`,
  };

  const graph = [
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: siteUrl,
      name: settings?.site_name ?? undefined,
      inLanguage: ["en-US", "es-US"],
      about: { "@id": ids.person },
    },
    {
      "@type": "Person",
      "@id": ids.person,
      name: facts.name,
      jobTitle: text.jobTitle,
      honorificSuffix: "MHC-LP",
      url: `${siteUrl}/about`,
      knowsLanguage: ["en", "es"],
      worksFor: { "@id": ids.practice },
      workLocation: place ?? undefined,
    },
    {
      "@type": "Organization",
      "@id": ids.practice,
      name: facts.practice,
    },
    {
      "@type": "Service",
      name: text.service,
      serviceType: text.service,
      description: settings?.footer_service_details ?? undefined,
      provider: { "@id": ids.person },
      areaServed: { "@type": "State", name: "New York" },
      availableLanguage: ["en", "es"],
      availableChannel: [
        place
          ? { "@type": "ServiceChannel", name: text.inPerson, serviceLocation: place }
          : null,
        { "@type": "ServiceChannel", name: text.telehealth, serviceUrl: `${siteUrl}/get-started` },
      ].filter(Boolean),
    },
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  return (
    <script
      type="application/ld+json"
      // JSON-LD is data, not code; "<" is escaped so Prismic text can't close the tag
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
