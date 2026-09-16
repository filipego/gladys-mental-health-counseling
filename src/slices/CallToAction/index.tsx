import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps) => {
  return (
    <section
      className="call-to-action"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="call-to-action__bounded" spacing="none">
        <div className="call-to-action__grid">
          <div className="call-to-action__copy">
            {slice.primary.heading ? (
              <Heading as="h2" className="call-to-action__heading" size="md">
                {slice.primary.heading}
              </Heading>
            ) : null}
            {isFilled.richText(slice.primary.body) ? (
              <PrismicRichText
                className="call-to-action__body"
                field={slice.primary.body}
              />
            ) : null}
          </div>

          <div className="call-to-action__actions">
            {isFilled.link(slice.primary.link) && slice.primary.link.text ? (
              <ButtonLink
                className="call-to-action__button"
                field={slice.primary.link}
                size="md"
                variant="primary"
              >
                {slice.primary.link.text}
              </ButtonLink>
            ) : null}
            {isFilled.richText(slice.primary.helper_text) ? (
              <PrismicRichText
                className="call-to-action__helper"
                field={slice.primary.helper_text}
              />
            ) : null}
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default CallToAction;
