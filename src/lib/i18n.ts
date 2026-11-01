/**
 * Site languages. The address never changes with the language: the proxy picks
 * English or Spanish from the visitor's toggle choice (a cookie) or, without
 * one, from the device language, and serves that version under the same URL.
 */
export const locales = ["en-us", "es-us"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en-us";

/** Cookie that remembers the visitor's toggle choice ("en" or "es"). */
export const languageCookie = "site-language";

export const isLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale);

export const localeFromChoice = (choice: string | undefined): Locale | null =>
  choice === "es" ? "es-us" : choice === "en" ? "en-us" : null;

/** The first of English or Spanish in the device's language list, else English. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  const preferences = (header ?? "")
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { tag, q: Number.isNaN(q) ? 0 : q, index };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  for (const { tag } of preferences) {
    if (tag === "es" || tag.startsWith("es-")) return "es-us";
    if (tag === "en" || tag.startsWith("en-")) return "en-us";
  }
  return defaultLocale;
}

/** The value for the `lang` attribute of the page. */
export const htmlLang = (locale: Locale) => (locale === "es-us" ? "es" : "en");

/** Interface text that lives in code rather than in Prismic. */
const dictionaries = {
  "en-us": {
    siteDescription: "Mental health counseling for parents, teens, and adults in New York.",
    skipToContent: "Skip to content",
    mainNavigation: "Main navigation",
    footerNavigation: "Footer navigation",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileNavigation: "Mobile navigation",
    mobileMainNavigation: "Mobile main navigation",
    languageToggle: { label: "Español", lang: "es", description: "Ver el sitio en español", choice: "es" },
    notFound: {
      heading: "That page isn't here.",
      body: "You can head back home or request a consultation.",
      home: "Return to Home",
      consultation: "Request a free consultation",
    },
    video: {
      playWithSound: "Play the video with sound",
      soundOn: "Turn sound on",
      mute: "Mute",
      play: "Play",
      pause: "Pause",
      fullScreen: "Full screen",
      exitFullScreen: "Exit full screen",
      youTube: "YouTube video",
      fallbackTitle: "Video",
    },
    mapOf: (address: string) => `Map of ${address}`,
    learnMore: "Learn more",
  },
  "es-us": {
    siteDescription: "Consejería de salud mental para padres, adolescentes y adultos en Nueva York.",
    skipToContent: "Saltar al contenido",
    mainNavigation: "Navegación principal",
    footerNavigation: "Navegación del pie de página",
    menu: "Menú",
    openMenu: "Abrir el menú",
    closeMenu: "Cerrar el menú",
    mobileNavigation: "Navegación móvil",
    mobileMainNavigation: "Navegación principal móvil",
    languageToggle: { label: "English", lang: "en", description: "View the site in English", choice: "en" },
    notFound: {
      heading: "Esta página no está aquí.",
      body: "Puede volver al inicio o solicitar una consulta.",
      home: "Volver al inicio",
      consultation: "Solicitar una consulta gratuita",
    },
    video: {
      playWithSound: "Reproducir el video con sonido",
      soundOn: "Activar el sonido",
      mute: "Silenciar",
      play: "Reproducir",
      pause: "Pausar",
      fullScreen: "Pantalla completa",
      exitFullScreen: "Salir de pantalla completa",
      youTube: "Video de YouTube",
      fallbackTitle: "Video",
    },
    mapOf: (address: string) => `Mapa de ${address}`,
    learnMore: "Más información",
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export const getDictionary = (locale: Locale | undefined): Dictionary =>
  dictionaries[locale ?? defaultLocale];
