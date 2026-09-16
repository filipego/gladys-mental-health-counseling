import { isFilled, Content as PrismicContent } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";

/** Props for the editor-facing Content slice. */
export type ContentProps = SliceComponentProps<PrismicContent.ContentSlice>;

const ctaVariant = (variant: string | null | undefined) => {
  if (variant === "Secondary") return "secondary" as const;
  if (variant === "Outline") return "outline" as const;
  return "primary" as const;
};

/** Renders editorial text sections with optional side-by-side imagery. */
const Content = ({ slice }: ContentProps) => {
  const isCentered = slice.variation === "centeredText";
  const hasImage =
    slice.variation === "imageRight" || slice.variation === "imageLeft";

  const copy = (
    <div
      className={
        isCentered
          ? "mx-auto flex max-w-3xl flex-col items-center text-center"
          : "flex flex-col items-start"
      }
    >
      {slice.primary.heading && <Heading as="h2" size="lg">{slice.primary.heading}</Heading>}
      {isFilled.richText(slice.primary.body) && (
        <PrismicRichText
          className={isCentered ? "mt-6 max-w-3xl text-lg" : "mt-6 text-lg"}
          field={slice.primary.body}
        />
      )}
      {slice.primary.ctas.length > 0 && (
        <div
          className={
            isCentered
              ? "mt-8 flex flex-wrap justify-center gap-3"
              : "mt-8 flex flex-wrap gap-3"
          }
        >
          {slice.primary.ctas.map((cta, index) => {
            if (!isFilled.link(cta.link)) return null;

            return (
              <ButtonLink
                field={cta.link}
                key={`${cta.label ?? "cta"}-${index}`}
                variant={ctaVariant(cta.link.variant)}
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
    <Bounded spacing={slice.primary.spacing} width={slice.primary.width}>
      {hasImage ? (
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {slice.variation === "imageLeft" &&
            isFilled.image(slice.primary.image) && (
              <PrismicNextImage
                className="h-auto w-full rounded-2xl object-cover"
                fallbackAlt=""
                field={slice.primary.image}
              />
            )}
          <div className={slice.variation === "imageLeft" ? "order-2" : "order-1"}>
            {copy}
          </div>
          {slice.variation === "imageRight" &&
            isFilled.image(slice.primary.image) && (
              <PrismicNextImage
                className="order-2 h-auto w-full rounded-2xl object-cover"
                fallbackAlt=""
                field={slice.primary.image}
              />
            )}
        </div>
      ) : (
        copy
      )}
    </Bounded>
  );
};

export default Content;
