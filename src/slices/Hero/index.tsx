import { PrismicNextImage } from "@prismicio/next";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps) => {
  const copy = (
    <div
      className={
        slice.variation === "split"
          ? "flex flex-col items-start"
          : "mx-auto flex max-w-4xl flex-col items-center text-center"
      }
    >
      {slice.primary.eyebrow && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {slice.primary.eyebrow}
        </p>
      )}
      {slice.primary.heading && (
        <Heading as="h2" size="xl">
          {slice.primary.heading}
        </Heading>
      )}
      {isFilled.richText(slice.primary.body) && (
        <PrismicRichText
          className="mt-6 max-w-3xl text-lg"
          field={slice.primary.body}
        />
      )}
      {slice.primary.ctas.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {slice.primary.ctas.map((cta, index) => {
            if (!isFilled.link(cta.link)) return null;

            const variant =
              cta.link.variant === "Secondary"
                ? "secondary"
                : cta.link.variant === "Outline"
                  ? "outline"
                  : "primary";

            return (
              <ButtonLink
                field={cta.link}
                key={`${cta.label ?? "cta"}-${index}`}
                variant={variant}
              >
                {cta.label || cta.link.text || "Learn more"}
              </ButtonLink>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <Bounded
      className="overflow-hidden"
      spacing={slice.primary.spacing}
      width={slice.primary.width}
    >
      {slice.variation === "split" ? (
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {copy}
          {isFilled.image(slice.primary.image) && (
            <PrismicNextImage
              className="h-auto w-full rounded-2xl object-cover"
              fallbackAlt=""
              field={slice.primary.image}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-10 lg:gap-14">
          {copy}
          {slice.variation === "default" &&
            isFilled.image(slice.primary.image) && (
              <PrismicNextImage
                className="h-auto w-full rounded-2xl object-cover"
                fallbackAlt=""
                field={slice.primary.image}
              />
            )}
        </div>
      )}
    </Bounded>
  );
};

export default Hero;
