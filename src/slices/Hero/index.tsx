import { PrismicNextImage } from "@prismicio/next";
import { asImageSrc, asLink, Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Heading } from "@/app/components/Heading";
import { HeroVideoPlayer } from "@/app/components/HeroVideoPlayer";
import { PrismicRichText } from "@/app/components/PrismicRichText";
import { getDictionary, type Locale } from "@/lib/i18n";

type HeroContext = {
  pageUid?: string;
  lang?: Locale;
};

export type HeroProps = SliceComponentProps<Content.HeroSlice, HeroContext>;

const pageClassNames: Record<string, string> = {
  home: "hero--home",
  about: "hero--about",
  "therapy--support": "hero--therapy",
  "get-started": "hero--get-started",
};

type HeroCtas = Content.HeroSliceDefaultPrimary["ctas"];

const HeroActions = ({ ctas }: { ctas: HeroCtas }) => {
  if (ctas.length === 0) return null;

  return (
    <div className="hero__actions">
      {ctas.map((cta, index) => {
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
  );
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

  if (slice.variation === "videoHomepageHero") {
    const videoSrc = asLink(slice.primary.video_file);
    const poster = asImageSrc(slice.primary.poster, { w: 1920 });

    return (
      <section className={`hero hero--video ${pageClassName ?? ""}`}>
        <Bounded as="div" className="hero-video__top" spacing="none">
          {slice.primary.heading ? (
            <Heading as="h1" className="hero__title" size="xl">
              {slice.primary.heading}
            </Heading>
          ) : null}
        </Bounded>

        {videoSrc ? (
          <Bounded as="div" className="hero-video__stage" spacing="none">
            <HeroVideoPlayer
              labels={getDictionary(context.lang).video}
              poster={poster}
              src={videoSrc}
              title={slice.primary.video_title}
            />
          </Bounded>
        ) : null}

        <div className="hero-video__band">
          <Bounded as="div" spacing="none">
            <div className="hero-video__band-grid">
              <div className="hero-video__band-main">
                {isFilled.richText(slice.primary.lead) ? (
                  <PrismicRichText className="hero__lead" field={slice.primary.lead} />
                ) : null}
                <HeroActions ctas={slice.primary.ctas} />
                {isFilled.richText(slice.primary.helper_copy) ? (
                  <PrismicRichText
                    className="hero__helper"
                    field={slice.primary.helper_copy}
                  />
                ) : null}
              </div>
              {isFilled.richText(slice.primary.supporting_copy) ? (
                <PrismicRichText
                  className="hero__supporting"
                  field={slice.primary.supporting_copy}
                />
              ) : null}
            </div>
          </Bounded>
        </div>
      </section>
    );
  }

  if (slice.variation !== "default" && slice.variation !== "fullImage") return null;

  const isFullImage = slice.variation === "fullImage";

  return (
    <Bounded
      className={`hero hero--homepage ${isFullImage ? "hero--homepage-image" : ""} ${pageClassName ?? ""}`}
      spacing="none"
    >
      {slice.variation === "fullImage" &&
      isFilled.image(slice.primary.background_image) ? (
        <div aria-hidden="true" className="hero__background">
          <PrismicNextImage fallbackAlt="" field={slice.primary.background_image} />
        </div>
      ) : null}
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

          <HeroActions ctas={slice.primary.ctas} />

          {isFilled.richText(slice.primary.helper_copy) ? (
            <PrismicRichText
              className="hero__helper"
              field={slice.primary.helper_copy}
            />
          ) : null}
        </div>

        {slice.variation === "default" &&
        isFilled.image(slice.primary.animation_poster) ? (
          <div className="hero__animation-stage">
            <PrismicNextImage fallbackAlt="" field={slice.primary.animation_poster} />
          </div>
        ) : null}
      </div>
    </Bounded>
  );
};

export default Hero;
