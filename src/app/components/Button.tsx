import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "inverse";
};

/** The button counterpart to ButtonLink for actions that do not navigate. */
export function Button({
  children,
  className,
  size = "md",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2.5 rounded-full border font-sans font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "sm" && "min-h-9 px-4 text-sm",
        size === "md" && "min-h-12 px-[22px] text-sm",
        size === "lg" && "min-h-[52px] px-6 text-base",
        variant === "primary" &&
          "border-wine bg-wine text-paper hover:border-wine-hover hover:bg-wine-hover",
        variant === "secondary" &&
          "border-border bg-background text-primary hover:bg-surface-strong",
        variant === "outline" &&
          "border-border bg-transparent text-primary hover:bg-surface hover:border-secondary",
        variant === "inverse" &&
          "border-paper bg-paper text-primary hover:border-rose hover:bg-rose",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
