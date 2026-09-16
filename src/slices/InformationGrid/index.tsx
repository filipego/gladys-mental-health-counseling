import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";

type InformationGridContext = {
  pageUid?: string;
};

/**
 * Props for `InformationGrid`.
 */
export type InformationGridProps =
  SliceComponentProps<Content.InformationGridSlice, InformationGridContext>;

/**
 * Component for "InformationGrid" Slices.
 */
const InformationGrid = ({ context, slice }: InformationGridProps) => {
  return (
    <section
      className={clsx(
        "information-grid",
        context.pageUid && `information-grid--${context.pageUid}`,
      )}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="information-grid__bounded" spacing="none">
        {slice.primary.heading ? (
          <Heading as="h2" className="information-grid__heading" size="md">
            {slice.primary.heading}
          </Heading>
        ) : null}

        {slice.primary.items.length > 0 ? (
          <dl className="information-grid__items">
            {slice.primary.items.map((item, index) => (
              <div className="information-grid__item" key={`${item.heading}-${index}`}>
                {item.heading ? (
                  <dt>
                    <Heading
                      as="h3"
                      className="information-grid__item-heading"
                      size="xs"
                    >
                      {item.heading}
                    </Heading>
                  </dt>
                ) : null}
                {isFilled.richText(item.body) ? (
                  <dd>
                    <PrismicRichText
                      className="information-grid__item-body"
                      field={item.body}
                    />
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        ) : null}
      </Bounded>
    </section>
  );
};

export default InformationGrid;
