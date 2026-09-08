import { type CSSProperties, type ElementType, type ReactNode } from "react";
import clsx from "clsx";

/** Values used by the matching Prismic "Section spacing" select field. */
export type SectionSpacing =
  | "standard"
  | "compact"
  | "none"
  | "none-above"
  | "none-below";

/** Values used by the matching Prismic "Content width" select field. */
export type ContentWidth = "standard" | "narrow" | "full";

type BoundedProps = {
  as?: ElementType;
  /** Controls the vertical space around a section. */
  spacing?: SectionSpacing;
  /** Controls the maximum width of the section's content. */
  width?: ContentWidth;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Bounded({
  as: Comp = "section",
  spacing = "standard",
  width = "standard",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        "px-5 md:px-8",
        spacing === "standard" && "py-16 md:py-24",
        spacing === "compact" && "py-8 md:py-12",
        spacing === "none" && "py-0",
        spacing === "none-above" && "pt-0 pb-16 md:pb-24",
        spacing === "none-below" && "pt-16 md:pt-24 pb-0",
        className
      )}
      {...restProps}
    >
      <div
        className={clsx(
          "mx-auto w-full",
          width === "standard" && "max-w-6xl",
          width === "narrow" && "max-w-4xl",
          width === "full" && "max-w-none"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
