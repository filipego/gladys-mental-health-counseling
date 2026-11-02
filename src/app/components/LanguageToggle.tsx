"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";

import { languageCookie, type Locale } from "@/lib/i18n";

type LanguageToggleProps = {
  className?: string;
  lang: Locale;
  /** "menu" opens a small list; "toggle" shows both languages side by side */
  variant?: "menu" | "toggle";
};

const languages = [
  { locale: "en-us", choice: "en", short: "EN", name: "English", htmlLang: "en" },
  { locale: "es-us", choice: "es", short: "ES", name: "Español", htmlLang: "es" },
] as const;

const labels: Record<Locale, { group: string; button: string }> = {
  "en-us": { group: "Language", button: "Language: English" },
  "es-us": { group: "Idioma", button: "Idioma: español" },
};

function Flag({ locale }: { locale: Locale }) {
  const id = useId();
  return (
    <svg aria-hidden="true" className="language-switch__flag" viewBox="0 0 20 20">
      <defs>
        <clipPath id={id}>
          <circle cx="10" cy="10" r="10" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {locale === "en-us" ? (
          <>
            <rect fill="#fff" height="20" width="20" />
            {[0, 2, 4, 6, 8, 10, 12].map((stripe) => (
              <rect fill="#b22234" height={20 / 13} key={stripe} width="20" y={(stripe * 20) / 13} />
            ))}
            <rect fill="#3c3b6e" height={(7 * 20) / 13} width="9.5" />
            {[
              [2, 2], [5, 2], [8, 2], [3.5, 4.2], [6.5, 4.2], [2, 6.4], [5, 6.4], [8, 6.4], [3.5, 8.6], [6.5, 8.6],
            ].map(([cx, cy]) => (
              <circle cx={cx} cy={cy} fill="#fff" key={`${cx}-${cy}`} r="0.55" />
            ))}
          </>
        ) : (
          <>
            <rect fill="#c60b1e" height="20" width="20" />
            <rect fill="#ffc400" height="10" width="20" y="5" />
          </>
        )}
      </g>
      <circle cx="10" cy="10" fill="none" r="9.5" stroke="rgb(23 19 15 / 0.12)" />
    </svg>
  );
}

function choose(choice: string) {
  document.cookie = `${languageCookie}=${choice}; path=/; max-age=31536000; samesite=lax`;
  window.location.reload();
}

/** Switches the site between English and Spanish and remembers the choice. */
export function LanguageToggle({ className, lang, variant = "toggle" }: LanguageToggleProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = languages.find((language) => language.locale === lang) ?? languages[0];

  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  if (variant === "toggle") {
    return (
      <div aria-label={labels[lang].group} className={clsx("language-switch language-switch--toggle", className)} role="group">
        {languages.map((language) => (
          <button
            aria-pressed={language.locale === lang}
            className="language-switch__segment"
            key={language.locale}
            lang={language.htmlLang}
            onClick={() => language.locale !== lang && choose(language.choice)}
            title={language.name}
            type="button"
          >
            <Flag locale={language.locale} />
            <span>{language.short}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={clsx("language-switch language-switch--menu", className)} data-open={open} ref={rootRef}>
      <button
        aria-controls={listId}
        aria-expanded={open}
        aria-label={labels[lang].button}
        className="language-switch__button"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <Flag locale={current.locale} />
        <span>{current.short}</span>
        <svg aria-hidden="true" className="language-switch__chevron" viewBox="0 0 12 12">
          <path d="m3 4.5 3 3 3-3" />
        </svg>
      </button>
      <ul aria-label={labels[lang].group} className="language-switch__list" id={listId} role="list">
        {languages.map((language) => (
          <li key={language.locale}>
            <button
              aria-current={language.locale === lang ? "true" : undefined}
              className="language-switch__option"
              lang={language.htmlLang}
              onClick={() => (language.locale === lang ? setOpen(false) : choose(language.choice))}
              tabIndex={open ? 0 : -1}
              type="button"
            >
              <Flag locale={language.locale} />
              <span>{language.name}</span>
              <svg aria-hidden="true" className="language-switch__check" viewBox="0 0 16 16">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
