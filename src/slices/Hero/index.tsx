import { PrismicNextImage } from "@prismicio/next";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";

type HeroContext = {
  pageUid?: string;
};

export type HeroProps = SliceComponentProps<Content.HeroSlice, HeroContext>;

const pageClassNames: Record<string, string> = {
  home: "hero--home",
  about: "hero--about",
  "therapy--support": "hero--therapy",
  "get-started": "hero--get-started",
};

const Hero = ({ context, slice }: HeroProps) => {
  const pageClassName = context.pageUid ? pageClassNames[context.pageUid] : undefined;

  if (slice.variation === "split") {
    const headingParts = slice.primary.heading?.split(" ") ?? [];
    const aboutHeading =
      context.pageUid === "about" && headingParts.length > 1 ? (
        <>
          {headingParts[0]}
          <span className="hero__title-line">{headingParts.slice(1).join(" ")}</span>
        </>
      ) : (
        slice.primary.heading
      );

    return (
      <Bounded className={`hero hero--inner ${pageClassName ?? ""}`} spacing="none">
        <div className="hero__grid hero__grid--inner">
          <div className="hero__copy">
            {slice.primary.heading ? (
              <Heading as="h1" className="hero__title" size="xl">
                {aboutHeading}
              </Heading>
            ) : null}
            {isFilled.richText(slice.primary.lead) ? (
              <PrismicRichText className="hero__lead" field={slice.primary.lead} />
            ) : null}
            {isFilled.richText(slice.primary.supporting_copy) ? (
              <PrismicRichText
                className="hero__supporting"
                field={slice.primary.supporting_copy}
              />
            ) : null}
          </div>

          {isFilled.image(slice.primary.image) ? (
            <div className="hero__portrait">
              <PrismicNextImage fallbackAlt="" field={slice.primary.image} />
            </div>
          ) : null}
        </div>
      </Bounded>
    );
  }

  if (slice.variation !== "default") return null;

  return (
    <Bounded className={`hero hero--homepage ${pageClassName ?? ""}`} spacing="none">
      <div className="hero__grid hero__grid--homepage">
        <div className="hero__copy">
          {slice.primary.heading ? (
            <Heading as="h1" className="hero__title" size="xl">
              {slice.primary.heading}
            </Heading>
          ) : null}
          {isFilled.richText(slice.primary.lead) ? (
            <PrismicRichText className="hero__lead" field={slice.primary.lead} />
          ) : null}
          {isFilled.richText(slice.primary.supporting_copy) ? (
            <PrismicRichText
              className="hero__supporting"
              field={slice.primary.supporting_copy}
            />
          ) : null}

          {slice.primary.ctas.length > 0 ? (
            <div className="hero__actions">
              {slice.primary.ctas.map((cta, index) => {
                if (!isFilled.link(cta.link)) return null;

                const label = cta.label || cta.link.text;
                if (!label) return null;

                const variant =
                  cta.link.variant === "Secondary"
                    ? "secondary"
                    : cta.link.variant === "Outline"
                      ? "outline"
                      : "primary";

                return (
                  <ButtonLink
                    className={
                      index === 0
                        ? "hero__button hero__button--primary"
                        : "hero__button hero__button--text"
                    }
                    field={cta.link}
                    key={`${label}-${index}`}
                    variant={variant}
                  >
                    {label}
                  </ButtonLink>
                );
              })}
            </div>
          ) : null}

          {isFilled.richText(slice.primary.helper_copy) ? (
            <PrismicRichText className="hero__helper" field={slice.primary.helper_copy} />
          ) : null}
        </div>

        {isFilled.image(slice.primary.animation_poster) ? (
          <div className="hero__animation-stage">
            <PrismicNextImage fallbackAlt="" field={slice.primary.animation_poster} />
          </div>
        ) : null}
      </div>
    </Bounded>
  );
};

export default Hero;
