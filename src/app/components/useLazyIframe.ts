"use client";

import { useEffect, useRef, useState } from "react";

/** Delays an iframe request until its container approaches the viewport. */
export function useLazyIframe(rootMargin = "300px") {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      // The fallback environment cannot observe visibility, so render the
      // media after this effect rather than leaving an empty aspect-ratio box.
      const timer = window.setTimeout(() => setIsInView(true), 0);

      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [rootMargin]);

  return { containerRef, isInView };
}
