"use client";

import { useEffect } from "react";

export function HeroHeaderObserver() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    let downwardTravel = 0;
    let upwardTravel = 0;

    const updateAppearance = () => {
      const hero = document.querySelector<HTMLElement>(".hero--homepage-image");
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      const isAtTop = currentScrollY <= 8;

      header.classList.toggle("site-header--homepage", Boolean(hero));
      header.classList.toggle(
        "site-header--hero-overlap",
        Boolean(hero) && isAtTop,
      );
      header.classList.toggle("site-header--scrolled", !isAtTop);

      if (isAtTop) {
        downwardTravel = 0;
        upwardTravel = 0;
        header.classList.remove("site-header--returning");
        header.classList.remove("site-header--scroll-hidden");
      } else if (scrollDelta > 0) {
        downwardTravel += scrollDelta;
        upwardTravel = 0;
        if (downwardTravel >= 4) {
          header.classList.remove("site-header--returning");
          header.classList.add("site-header--scroll-hidden");
        }
      } else if (scrollDelta < 0) {
        upwardTravel += Math.abs(scrollDelta);
        downwardTravel = 0;
        if (upwardTravel >= 18) {
          header.classList.add("site-header--returning");
          header.classList.remove("site-header--scroll-hidden");
        }
      }

      lastScrollY = currentScrollY;
    };

    updateAppearance();
    window.addEventListener("scroll", updateAppearance, { passive: true });
    window.addEventListener("resize", updateAppearance);
    const mutationObserver = new MutationObserver(updateAppearance);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", updateAppearance);
      window.removeEventListener("resize", updateAppearance);
      mutationObserver.disconnect();
      header.classList.remove("site-header--homepage");
      header.classList.remove("site-header--hero-overlap");
      header.classList.remove("site-header--scrolled");
      header.classList.remove("site-header--returning");
      header.classList.remove("site-header--scroll-hidden");
    };
  }, []);

  return null;
}
