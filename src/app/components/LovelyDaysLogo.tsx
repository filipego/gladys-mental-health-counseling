import clsx from "clsx";
import Image from "next/image";

export type LovelyDaysLogoSize = "sm" | "md" | "lg" | "display";

export type LovelyDaysLogoProps = {
  size?: LovelyDaysLogoSize;
  className?: string;
  alt?: string;
};

export function LovelyDaysLogo({
  size = "sm",
  className,
  alt = "Lovely Days",
}: LovelyDaysLogoProps) {
  return (
    <Image
      alt={alt}
      className={clsx("lovely-days-logo", `lovely-days-logo--${size}`, className)}
      height={356}
      src="/lovely-days.svg"
      width={1242}
    />
  );
}
