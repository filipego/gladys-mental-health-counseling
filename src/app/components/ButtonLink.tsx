import type { PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

import { ArrowIcon } from "./ArrowIcon";
import { PrismicLink } from "./PrismicLink";

/** Values used by the matching Prismic CTA style select field. */
export type ButtonVariant = "primary" | "secondary" | "outline";

export type ButtonLinkProps = PrismicNextLinkProps & {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  children,
  className,
  prefetch = false,
  showArrow = true,
  ...props
}: ButtonLinkProps) {
  return (
    <PrismicLink
      className={clsx(
        "inline-flex items-center justify-center gap-5 rounded-full border font-sans font-medium no-underline! transition-colors duration-200 whitespace-normal text-center py-1.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "sm" && "min-h-9 px-4 text-sm",
        size === "md" && "min-h-11 px-5 text-sm",
        size === "lg" && "min-h-[52px] px-6 text-base",
        variant === "primary" &&
          "border-wine bg-wine !text-paper hover:border-wine-hover hover:bg-wine-hover",
        variant === "secondary" &&
          "border-border bg-background text-primary hover:bg-surface-strong",
        variant === "outline" &&
          "border-border bg-transparent text-primary hover:bg-surface hover:border-secondary",
        className
      )}
      prefetch={prefetch}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? <ArrowIcon className="size-4" /> : null}
    </PrismicLink>
  );
}
