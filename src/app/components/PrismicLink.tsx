import {
  PrismicNextLink,
  type PrismicNextLinkProps,
} from "@prismicio/next";
import clsx from "clsx";

export type PrismicLinkProps = PrismicNextLinkProps;

/**
 * The shared foundation for links stored in Prismic.
 *
 * Use this component for links in running text. Use ButtonLink for a deliberate
 * call to action from a dedicated Prismic Link field.
 */
export function PrismicLink({
  children,
  className,
  prefetch = false,
  ...props
}: PrismicLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors",
        "hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </PrismicNextLink>
  );
}
