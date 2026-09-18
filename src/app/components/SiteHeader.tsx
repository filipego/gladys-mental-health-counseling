import { isFilled } from "@prismicio/client";

import type { SettingsDocument } from "../../../prismicio-types";
import { Bounded } from "./Bounded";
import { PrismicLink } from "./PrismicLink";
import { SiteMobileNavigation } from "./SiteMobileNavigation";
import { HeroHeaderObserver } from "./HeroHeaderObserver";
import { LovelyDaysLogo } from "./LovelyDaysLogo";

type SiteHeaderProps = {
  settings: SettingsDocument["data"] | null;
};

export function SiteHeader({ settings }: SiteHeaderProps) {
  const siteName = settings?.site_name;
  const navigation =
    settings?.header_navigation?.filter(
      (item) => item.label && isFilled.link(item.link),
    ) ?? [];

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
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
            aria-label="Main navigation"
            className="site-header__nav site-header__nav--desktop"
          >
            {navigation.map((item, index) => (
              <PrismicLink
                className={
                  item.is_call_to_action
                    ? "site-nav-link site-nav-link--cta"
                    : "site-nav-link"
                }
                field={item.link}
                key={`${item.label}-${index}`}
              >
                {item.label}
              </PrismicLink>
            ))}
          </nav>
          <SiteMobileNavigation navigation={navigation} />
        </Bounded>
      </header>
    </>
  );
}
