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
        "font-heading font-medium tracking-[-0.035em] text-balance",
        size === "xl" && "text-[clamp(38px,4.1vw,54px)] leading-[1.09]",
        size === "lg" && "text-[clamp(30px,3vw,38px)] leading-[1.17]",
        size === "md" && "text-[clamp(26px,3.1vw,45px)] leading-[1.07]",
        size === "sm" && "text-[clamp(22px,2.2vw,32px)] leading-[1.1]",
        size === "xs" && "text-[clamp(18px,1.55vw,21px)] leading-[1.2]",
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
