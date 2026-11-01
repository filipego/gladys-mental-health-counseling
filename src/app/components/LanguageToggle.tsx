"use client";

import clsx from "clsx";

import { getDictionary, languageCookie, type Locale } from "@/lib/i18n";

type LanguageToggleProps = {
  className?: string;
  lang: Locale;
  tabIndex?: number;
};

/** Switches the site between English and Spanish and remembers the choice. */
export function LanguageToggle({ className, lang, tabIndex }: LanguageToggleProps) {
  const toggle = getDictionary(lang).languageToggle;

  return (
    <button
      aria-label={toggle.description}
      className={clsx("site-language-toggle", className)}
      lang={toggle.lang}
      onClick={() => {
        document.cookie = `${languageCookie}=${toggle.choice}; path=/; max-age=31536000; samesite=lax`;
        window.location.reload();
      }}
      tabIndex={tabIndex}
      type="button"
    >
      {toggle.label}
    </button>
  );
}
