import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";
import { TextLink } from "@/app/components/TextLink";

/**
 * Props for `ImageAndText`.
 */
export type ImageAndTextProps = SliceComponentProps<Content.ImageAndTextSlice>;

/**
 * Component for "ImageAndText" Slices.
 */
const ImageAndText = ({ slice }: ImageAndTextProps) => {
  const hasBackground = slice.primary.add_background_color;

  return (
    <section
      className={clsx(
        "image-and-text",
        hasBackground && "image-and-text--background",
        slice.primary.add_top_border && "image-and-text--border-top",
        slice.primary.add_bottom_border && "image-and-text--border-bottom",
      )}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="image-and-text__bounded" spacing="none">
        <div className="image-and-text__grid">
          {isFilled.image(slice.primary.image) ? (
            <figure className="image-and-text__media">
              <PrismicNextImage fallbackAlt="" field={slice.primary.image} />
            </figure>
          ) : null}

          <div className="image-and-text__copy">
            {slice.primary.heading ? (
              <Heading as="h2" className="image-and-text__heading" size="md">
                {slice.primary.heading}
              </Heading>
            ) : null}

            {isFilled.richText(slice.primary.body) ? (
              <PrismicRichText
                className="image-and-text__body"
                field={slice.primary.body}
              />
            ) : null}

            {isFilled.link(slice.primary.link) && slice.primary.link.text ? (
              <TextLink
                className="image-and-text__link"
                field={slice.primary.link}
                tone={hasBackground ? "light" : "dark"}
              >
                {slice.primary.link.text}
              </TextLink>
            ) : null}

            {slice.primary.supporting_heading ||
            isFilled.richText(slice.primary.supporting_body) ? (
              <div className="image-and-text__supporting">
                {slice.primary.supporting_heading ? (
                  <Heading
                    as="h3"
                    className="image-and-text__supporting-heading"
                    color={hasBackground ? "inverse" : "default"}
                    size="xs"
                  >
                    {slice.primary.supporting_heading}
                  </Heading>
                ) : null}
                {isFilled.richText(slice.primary.supporting_body) ? (
                  <PrismicRichText
                    className="image-and-text__supporting-body"
                    field={slice.primary.supporting_body}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default ImageAndText;
