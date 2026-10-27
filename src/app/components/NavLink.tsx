"use client";

import { asLink, type LinkField } from "@prismicio/client";
import type { ComponentProps, ReactNode } from "react";
import { usePathname } from "next/navigation";

import { PrismicLink } from "./PrismicLink";

type NavLinkProps = Pick<ComponentProps<"a">, "className" | "onClick" | "tabIndex"> & {
  children: ReactNode;
  field: LinkField;
};

const normalize = (path: string) => path.replace(/[#?].*$/, "").replace(/\/+$/, "") || "/";

/** A header navigation link that marks itself as the current page. */
export function NavLink({ field, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const href = asLink(field);
  const target = href?.startsWith("/") ? normalize(href) : null;
  const current = normalize(pathname ?? "/");
  // Links to a section (e.g. /get-started#consultation) are actions, not pages.
  const isCurrent =
    !href?.includes("#") &&
    target !== null &&
    (target === "/" ? current === "/" : current === target || current.startsWith(`${target}/`));

  return (
    <PrismicLink
      aria-current={isCurrent ? "page" : undefined}
      field={field}
      {...props}
    />
  );
}
