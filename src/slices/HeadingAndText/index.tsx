import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";
import { TextLink } from "@/app/components/TextLink";

type HeadingAndTextContext = {
  pageUid?: string;
};

/**
 * Props for `HeadingAndText`.
 */
export type HeadingAndTextProps =
  SliceComponentProps<Content.HeadingAndTextSlice, HeadingAndTextContext>;

const pageClassNames: Record<string, string> = {
  home: "heading-and-text--home",
  about: "heading-and-text--about",
  "therapy--support": "heading-and-text--therapy",
  "get-started": "heading-and-text--get-started",
};

/**
 * Component for "HeadingAndText" Slices.
 */
const HeadingAndText = ({ context, slice }: HeadingAndTextProps) => {
  const pageClassName = context.pageUid
    ? pageClassNames[context.pageUid]
    : undefined;

  if (slice.variation === "conversationChapter") {
    const usesWineBackground = slice.primary.use_wine_background === true;

    return (
      <section
        className={clsx(
          "heading-and-text heading-and-text--conversation-chapter",
          usesWineBackground && "heading-and-text--wine",
          pageClassName,
        )}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Bounded as="div" className="heading-and-text__bounded" spacing="none">
          {slice.primary.heading ? (
            <Heading as="h2" className="heading-and-text__heading" size="md">
              {slice.primary.heading}
            </Heading>
          ) : null}

          <div className="heading-and-text__conversation-grid">
            {isFilled.richText(slice.primary.body) ? (
              <PrismicRichText
                className="heading-and-text__rich-text heading-and-text__conversation-body"
                field={slice.primary.body}
              />
            ) : null}
            {isFilled.richText(slice.primary.statement) ? (
              <PrismicRichText
                className="heading-and-text__statement"
                field={slice.primary.statement}
              />
            ) : null}
          </div>
        </Bounded>
      </section>
    );
  }

  if (slice.variation === "twoColumns") {
    const usesWineBackground = slice.primary.use_wine_background === true;

    return (
      <section
        className={clsx(
          "heading-and-text heading-and-text--two-columns",
          usesWineBackground && "heading-and-text--wine",
          pageClassName,
        )}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <Bounded as="div" className="heading-and-text__bounded" spacing="none">
          {slice.primary.heading ? (
            <Heading as="h2" className="heading-and-text__heading" size="md">
              {slice.primary.heading}
            </Heading>
          ) : null}

          <div className="heading-and-text__two-column-grid">
            {isFilled.richText(slice.primary.left_body) ? (
              <PrismicRichText
                className="heading-and-text__rich-text"
                field={slice.primary.left_body}
              />
            ) : null}
            {isFilled.richText(slice.primary.right_body) ? (
              <PrismicRichText
                className="heading-and-text__rich-text"
                field={slice.primary.right_body}
              />
            ) : null}
          </div>
        </Bounded>
      </section>
    );
  }

  if (slice.variation !== "default") return null;

  const usesWineBackground = slice.primary.use_wine_background === true;

  return (
    <section
      className={clsx(
        "heading-and-text heading-and-text--side-by-side",
        usesWineBackground && "heading-and-text--wine",
        pageClassName,
      )}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="heading-and-text__bounded" spacing="none">
        <div className="heading-and-text__side-grid">
          {slice.primary.heading ? (
            <Heading as="h2" className="heading-and-text__heading" size="md">
              {slice.primary.heading}
            </Heading>
          ) : null}

          <div className="heading-and-text__content">
            {isFilled.richText(slice.primary.body) ? (
              <PrismicRichText
                className="heading-and-text__rich-text"
                field={slice.primary.body}
              />
            ) : null}
            {isFilled.link(slice.primary.link) && slice.primary.link.text ? (
              <TextLink
                className="heading-and-text__link"
                field={slice.primary.link}
                tone={usesWineBackground ? "light" : "dark"}
              >
                {slice.primary.link.text}
              </TextLink>
            ) : null}
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default HeadingAndText;
