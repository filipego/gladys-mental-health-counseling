import type { ReactNode } from "react";
import clsx from "clsx";

import { ArrowIcon } from "./ArrowIcon";
import { PrismicLink, type PrismicLinkProps } from "./PrismicLink";

type TextLinkProps = PrismicLinkProps & {
  children: ReactNode;
  tone?: "dark" | "light";
};

/** A reusable editorial link with the site's quiet underline and arrow. */
export function TextLink({
  children,
  className,
  tone = "dark",
  ...props
}: TextLinkProps) {
  return (
    <PrismicLink
      className={clsx(
        "text-link",
        tone === "light" ? "text-link--light" : "text-link--dark",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowIcon className="text-link__icon" />
    </PrismicLink>
  );
}
