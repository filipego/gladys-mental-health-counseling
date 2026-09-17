import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";
import { TextLink } from "@/app/components/TextLink";

export type WhoIWorkWithProps = SliceComponentProps<Content.WhoIWorkWithSlice>;

const WhoIWorkWith = ({ slice }: WhoIWorkWithProps) => {
  return (
    <section
      className="who-i-work-with"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="who"
    >
      <Bounded as="div" className="who-i-work-with__bounded" spacing="none">
        <div className="who-i-work-with__heading-row">
          {slice.primary.heading ? (
            <Heading as="h2" className="who-i-work-with__heading" size="md">
              {slice.primary.heading}
            </Heading>
          ) : null}

          {isFilled.richText(slice.primary.practice_note) ? (
            <PrismicRichText
              className="who-i-work-with__practice-note"
              field={slice.primary.practice_note}
            />
          ) : null}
        </div>

        <div className="who-i-work-with__audiences">
          {slice.primary.audience_items.map((item, index) => (
            <article
              className="who-i-work-with__audience"
              key={`${item.audience_name}-${index}`}
            >
              {item.audience_name ? (
                <Heading
                  as="h3"
                  className="who-i-work-with__audience-name"
                  size="sm"
                >
                  {item.audience_name}
                </Heading>
              ) : null}

              {isFilled.image(item.image) ? (
                <figure className="who-i-work-with__image">
                  <PrismicNextImage fallbackAlt="" field={item.image} />
                </figure>
              ) : null}

              <div className="who-i-work-with__description">
                {isFilled.richText(item.description) ? (
                  <PrismicRichText
                    className="who-i-work-with__body"
                    field={item.description}
                  />
                ) : null}

                {isFilled.link(item.link) && item.link.text ? (
                  <TextLink
                    className="who-i-work-with__link"
                    field={item.link}
                  >
                    {item.link.text}
                  </TextLink>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default WhoIWorkWith;
