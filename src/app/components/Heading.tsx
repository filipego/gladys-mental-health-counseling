import { type ReactNode } from "react";
import clsx from "clsx";

export type HeadingColor =
  | "default"
  | "muted"
  | "primary"
  | "secondary"
  | "inverse";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  /** A semantic text color defined in src/app/globals.css. */
  color?: HeadingColor;
  children: ReactNode;
  className?: string;
};

export function Heading({
  as: Comp = "h2",
  className,
  children,
  size = "lg",
  color = "default",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-sans font-semibold tracking-tight",
        size === "xl" && "text-4xl lg:text-8xl",
        size === "lg" && "text-3xl lg:text-7xl",
        size === "md" && "text-2xl lg:text-5xl",
        size === "sm" && "text-2xl lg:text-4xl",
        size === "xs" && "text-lg lg:text-xl",
        color === "default" && "text-foreground",
        color === "muted" && "text-muted-foreground",
        color === "primary" && "text-primary",
        color === "secondary" && "text-secondary",
        color === "inverse" && "text-inverse",
        className
      )}
    >
      {children}
    </Comp>
  );
}
