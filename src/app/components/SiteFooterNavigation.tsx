"use client";

import { asLink, isFilled } from "@prismicio/client";
import { usePathname } from "next/navigation";

import type { SettingsDocument } from "../../../prismicio-types";
import { ArrowIcon } from "./ArrowIcon";
import { PrismicLink } from "./PrismicLink";

type FooterNavigationItem =
  SettingsDocument["data"]["footer_navigation"][number];

type SiteFooterNavigationProps = {
  items: SettingsDocument["data"]["footer_navigation"];
};

function normalizePathname(value: string) {
  const pathname = new URL(value, "https://local.invalid").pathname;

  return pathname === "/" ? pathname : pathname.replace(/\/$/, "");
}

export function isCurrentFooterLink(
  item: FooterNavigationItem,
  pathname: string | null,
) {
  const href = asLink(item.link);

  return Boolean(
    pathname && href && normalizePathname(href) === normalizePathname(pathname),
  );
}

export function SiteFooterNavigation({ items }: SiteFooterNavigationProps) {
  const pathname = usePathname();
  const navigation = items.filter(
    (item) =>
      item.label &&
      isFilled.link(item.link) &&
      !isCurrentFooterLink(item, pathname),
  );

  return (
    <nav aria-label="Footer navigation" className="site-footer__nav">
      {navigation.map((item, index) => (
        <PrismicLink
          className="site-footer__link"
          field={item.link}
          key={`${item.label}-${index}`}
        >
          <span>{item.label}</span>
          <ArrowIcon />
        </PrismicLink>
      ))}
    </nav>
  );
}
