import { isFilled } from "@prismicio/client";

import type { SettingsDocument } from "../../../prismicio-types";
import { Bounded } from "./Bounded";
import { LovelyDaysLogo } from "./LovelyDaysLogo";
import { PrismicLink } from "./PrismicLink";
import { SiteFooterNavigation } from "./SiteFooterNavigation";

type SiteFooterProps = {
  settings: SettingsDocument["data"] | null;
};

function getLinkText(
  field: SettingsDocument["data"]["privacy_link"],
): string {
  return "text" in field && typeof field.text === "string" && field.text
    ? field.text
    : "";
}

export function SiteFooter({ settings }: SiteFooterProps) {
  const siteName = settings?.site_name;
  const footerNavigation = settings?.footer_navigation ?? [];
  const address = settings?.footer_address;
  const serviceDetails = settings?.footer_service_details;
  const credential = settings?.professional_credential;
  const supervision = settings?.supervision_statement;
  const emergencyNotice = settings?.emergency_notice;
  const copyright = settings?.copyright_notice;
  const hasPrivacyLink = Boolean(
    settings?.privacy_link && isFilled.link(settings.privacy_link),
  );

  return (
    <footer className="site-footer">
      <Bounded as="div" spacing="none">
        <div className="site-footer__main">
          <div className="site-footer__location">
            {address ? <p className="site-footer__address">{address}</p> : null}
            {serviceDetails ? <p>{serviceDetails}</p> : null}
          </div>

          <SiteFooterNavigation items={footerNavigation} />
        </div>

        {siteName ? (
          <PrismicLink
            aria-label={siteName}
            className="site-footer__signature"
            href="/"
          >
            <LovelyDaysLogo alt="" size="display" />
          </PrismicLink>
        ) : null}

        <div className="site-footer__bottom">
          {credential || supervision ? (
            <p>
              {credential}
              {credential && supervision ? <br /> : null}
              {supervision}
            </p>
          ) : null}
          {emergencyNotice ? <p>{emergencyNotice}</p> : null}
          <div className="site-footer__legal">
            {copyright ? <span>{copyright}</span> : null}
            {hasPrivacyLink ? (
              <PrismicLink
                className="site-footer__privacy"
                field={settings!.privacy_link}
              >
                {getLinkText(settings!.privacy_link)}
              </PrismicLink>
            ) : null}
          </div>
        </div>
      </Bounded>
    </footer>
  );
}
