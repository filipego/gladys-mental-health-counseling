import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import type { SettingsDocument } from "../../../prismicio-types";
import { SiteFooter } from "./SiteFooter";
import { isCurrentFooterLink } from "./SiteFooterNavigation";
import { SiteHeader } from "./SiteHeader";
import { LovelyDaysLogo } from "./LovelyDaysLogo";

const emptySettings = {
  site_name: null,
  header_navigation: [],
  footer_navigation: [],
  footer_address: null,
  footer_service_details: null,
  professional_credential: null,
  supervision_statement: null,
  emergency_notice: null,
  copyright_notice: null,
  privacy_link: { link_type: "Any" },
  slices: [],
  meta_title: null,
  meta_description: null,
  meta_image: {},
} as unknown as SettingsDocument["data"];

test("SiteHeader does not invent content when Settings is empty", () => {
  const html = renderToStaticMarkup(<SiteHeader settings={emptySettings} />);

  assert.doesNotMatch(html, /Gladys Henriquez/);
  assert.doesNotMatch(html, /About Gladys/);
  assert.doesNotMatch(html, /Therapy &amp; Support/);
  assert.doesNotMatch(html, /Get Started/);
  assert.match(html, /aria-label="Main navigation"/);
});

test("LovelyDaysLogo exposes reusable size variants with a transparent asset", () => {
  const html = renderToStaticMarkup(
    <LovelyDaysLogo alt="" className="test-logo" size="md" />,
  );

  assert.match(html, /src="\/lovely-days\.svg"/);
  assert.match(html, /lovely-days-logo--md/);
  assert.match(html, /class="[^"]*test-logo/);
});

test("The full-image homepage makes the server-rendered header transparent before hydration", () => {
  const css = readFileSync(
    new URL("../globals.css", import.meta.url),
    "utf8",
  );

  assert.match(
    css,
    /:where\(body:has\(\.hero--homepage-image\)\) \.site-header\s*\{[^}]*background:\s*transparent/,
  );
});

test("Cross-page navigation does not inherit global smooth scrolling", () => {
  const css = readFileSync(
    new URL("../globals.css", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(css, /scroll-behavior:\s*smooth/);
});

test("SiteFooter does not invent content when Settings is empty", () => {
  const html = renderToStaticMarkup(<SiteFooter settings={emptySettings} />);

  assert.doesNotMatch(html, /55 Broadway Ave/);
  assert.doesNotMatch(html, /Mental Health Counselor/);
  assert.doesNotMatch(html, /not monitored for emergencies/);
  assert.match(html, /aria-label="Footer navigation"/);
  assert.doesNotMatch(html, />Privacy</);
});

test("The shared shell renders Settings content", () => {
  const settings = {
    ...emptySettings,
    site_name: "A CMS site name",
    header_navigation: [
      {
        label: "A CMS header link",
        link: { link_type: "Web", url: "https://example.com/header" },
        is_call_to_action: true,
      },
    ],
    footer_navigation: [
      {
        label: "A CMS footer link",
        link: { link_type: "Web", url: "https://example.com/footer" },
      },
    ],
    footer_address: "A CMS address",
    footer_service_details: "A CMS service description",
    professional_credential: "A CMS credential",
    supervision_statement: "A CMS supervision statement",
    emergency_notice: "A CMS emergency notice",
    copyright_notice: "A CMS copyright",
    privacy_link: {
      link_type: "Web",
      url: "https://example.com/privacy",
      text: "A CMS privacy link",
    },
  } as SettingsDocument["data"];

  const html = renderToStaticMarkup(
    <>
      <SiteHeader settings={settings} />
      <SiteFooter settings={settings} />
    </>,
  );

  assert.match(html, /aria-label="A CMS site name"/);
  assert.match(html, /lovely-days-logo--md/);
  assert.match(html, /lovely-days-logo--display/);
  assert.match(html, /A CMS header link/);
  assert.match(html, /aria-label="Open navigation"/);
  assert.match(html, /aria-label="Mobile navigation"/);
  assert.match(html, /aria-label="Mobile main navigation"/);
  assert.match(html, /data-open="false"/);
  assert.match(html, /A CMS footer link/);
  assert.match(html, /A CMS address/);
  assert.match(html, /A CMS credential/);
  assert.match(html, /A CMS emergency notice/);
  assert.match(html, /A CMS copyright/);
  assert.match(html, /A CMS privacy link/);
});

test("The shared shell tolerates a published Settings document before new fields exist", () => {
  const legacySettings = {
    site_name: "Legacy Settings",
  } as unknown as SettingsDocument["data"];

  assert.doesNotThrow(() =>
    renderToStaticMarkup(
      <>
        <SiteHeader settings={legacySettings} />
        <SiteFooter settings={legacySettings} />
      </>,
    ),
  );
});

test("Footer navigation identifies the current Prismic route", () => {
  const home = {
    label: "Home",
    link: { link_type: "Web", url: "/" },
  } as SettingsDocument["data"]["footer_navigation"][number];
  const about = {
    label: "About Gladys",
    link: { link_type: "Web", url: "/about" },
  } as SettingsDocument["data"]["footer_navigation"][number];

  assert.equal(isCurrentFooterLink(home, "/"), true);
  assert.equal(isCurrentFooterLink(home, "/about"), false);
  assert.equal(isCurrentFooterLink(about, "/about/"), true);
  assert.equal(isCurrentFooterLink(about, "/therapy--support"), false);
});
