"use client";

import { useEffect, useRef, useState } from "react";

import type { SettingsDocument } from "../../../prismicio-types";
import { PrismicLink } from "./PrismicLink";

type NavigationItem = SettingsDocument["data"]["header_navigation"][number];

type SiteMobileNavigationProps = {
  navigation: NavigationItem[];
};

export function SiteMobileNavigation({ navigation }: SiteMobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");

    function closeWhenLeavingMobile(event: MediaQueryListEvent) {
      if (!event.matches) setIsOpen(false);
    }

    mobileQuery.addEventListener("change", closeWhenLeavingMobile);
    return () => mobileQuery.removeEventListener("change", closeWhenLeavingMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    document.body.style.overflow = "hidden";
    firstElement?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  return (
    <div className="site-mobile-nav">
      <button
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        aria-label="Open navigation"
        className="site-mobile-nav__trigger"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <span />
        <span />
      </button>

      <button
        aria-hidden={!isOpen}
        aria-label="Close navigation"
        className="site-mobile-nav__backdrop"
        data-open={isOpen}
        onClick={() => setIsOpen(false)}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />

      <div
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
        aria-modal="true"
        className="site-mobile-nav__panel"
        data-open={isOpen}
        id="mobile-navigation-panel"
        ref={panelRef}
        role="dialog"
      >
        <div className="site-mobile-nav__panel-header">
          <span className="site-mobile-nav__label">Menu</span>
          <button
            aria-label="Close navigation"
            className="site-mobile-nav__close"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M5 5 19 19M19 5 5 19" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile main navigation" className="site-mobile-nav__links">
          {navigation.map((item, index) => (
            <PrismicLink
              className={
                item.is_call_to_action
                  ? "site-mobile-nav__link site-mobile-nav__link--cta"
                  : "site-mobile-nav__link"
              }
              field={item.link}
              key={`${item.label}-${index}`}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              <span>{item.label}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M5 12h14M14 7l5 5-5 5" />
              </svg>
            </PrismicLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
