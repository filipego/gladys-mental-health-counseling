import { isFilled } from "@prismicio/client";

import type { SettingsDocument } from "../../../prismicio-types";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Bounded } from "./Bounded";
import { PrismicLink } from "./PrismicLink";
import { SiteMobileNavigation } from "./SiteMobileNavigation";
import { HeroHeaderObserver } from "./HeroHeaderObserver";
import { LanguageToggle } from "./LanguageToggle";
import { LovelyDaysLogo } from "./LovelyDaysLogo";
import { NavLink } from "./NavLink";

type SiteHeaderProps = {
  lang?: Locale;
  settings: SettingsDocument["data"] | null;
};

export function SiteHeader({ lang = "en-us", settings }: SiteHeaderProps) {
  const text = getDictionary(lang);
  const siteName = settings?.site_name;
  const navigation =
    settings?.header_navigation?.filter(
      (item) => item.label && isFilled.link(item.link),
    ) ?? [];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {text.skipToContent}
      </a>
      <header className="site-header">
        <HeroHeaderObserver />
        <Bounded as="div" className="site-header__bounded" spacing="none">
          {siteName ? (
            <PrismicLink aria-label={siteName} className="site-wordmark" href="/">
              <LovelyDaysLogo alt="" size="md" />
            </PrismicLink>
          ) : null}

          <nav
            aria-label={text.mainNavigation}
            className="site-header__nav site-header__nav--desktop"
          >
            {navigation.map((item, index) => (
              <NavLink
                className={
                  item.is_call_to_action
                    ? "site-nav-link site-nav-link--cta"
                    : "site-nav-link"
                }
                field={item.link}
                key={`${item.label}-${index}`}
              >
                {item.label}
              </NavLink>
            ))}
            <LanguageToggle className="site-nav-link" lang={lang} />
          </nav>
          <SiteMobileNavigation lang={lang} navigation={navigation} />
        </Bounded>
      </header>
    </>
  );
}
