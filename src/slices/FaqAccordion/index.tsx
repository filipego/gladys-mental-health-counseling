import { Content, isFilled } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";

export type FaqAccordionProps =
  SliceComponentProps<Content.FaqAccordionSlice>;

const FaqAccordion = ({ slice }: FaqAccordionProps) => {
  return (
    <section
      className="faq-accordion"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="faq-accordion__bounded" spacing="none">
        <div className="faq-accordion__grid">
          {slice.primary.heading ? (
            <Heading as="h2" className="faq-accordion__heading" size="md">
              {slice.primary.heading}
            </Heading>
          ) : null}

          {slice.primary.faq_items.length > 0 ? (
            <div className="faq-accordion__items">
              {slice.primary.faq_items.map((item, index) => (
                <details
                  className="faq-accordion__item"
                  key={`${item.question}-${index}`}
                >
                  <summary>{item.question}</summary>
                  {isFilled.richText(item.answer) ? (
                    <PrismicRichText
                      className="faq-accordion__answer"
                      field={item.answer}
                    />
                  ) : null}
                </details>
              ))}
            </div>
          ) : null}
        </div>
      </Bounded>
    </section>
  );
};

export default FaqAccordion;
