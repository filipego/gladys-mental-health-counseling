import type { PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

import { PrismicLink } from "./PrismicLink";

/** Values used by the matching Prismic CTA style select field. */
export type ButtonVariant = "primary" | "secondary" | "outline";

export type ButtonLinkProps = PrismicNextLinkProps & {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  children,
  className,
  prefetch = false,
  ...props
}: ButtonLinkProps) {
  return (
    <PrismicLink
      className={clsx(
        "inline-flex items-center justify-center rounded-full border font-sans font-medium no-underline transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "sm" && "min-h-9 px-4 text-sm",
        size === "md" && "min-h-11 px-5 text-sm",
        size === "lg" && "min-h-13 px-6 text-base",
        variant === "primary" &&
          "border-primary bg-primary !text-inverse hover:opacity-85",
        variant === "secondary" &&
          "border-secondary bg-secondary !text-inverse hover:opacity-85",
        variant === "outline" &&
          "border-primary bg-transparent text-primary hover:bg-primary hover:text-inverse",
        className
      )}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </PrismicLink>
  );
}
