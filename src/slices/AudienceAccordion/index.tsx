"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { type SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";
import { TextLink } from "@/app/components/TextLink";

export type AudienceAccordionProps =
  SliceComponentProps<Content.AudienceAccordionSlice>;

const getAnchorId = (anchorId: string | null, index: number) =>
  anchorId?.trim() || `audience-${index + 1}`;

const AudienceAccordion = ({ slice }: AudienceAccordionProps) => {
  const items = slice.primary.audience_items;
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.length > 0 ? 0 : null,
  );
  const [isPinning, setIsPinning] = useState(false);
  const toggleRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const index = items.findIndex(
        (item, itemIndex) => getAnchorId(item.anchor_id, itemIndex) === hash,
      );

      if (index < 0) return;

      const pinItemToHeader = () => {
        const item = document.getElementById(hash);
        const header = document.querySelector<HTMLElement>(".site-header");
        if (!item) return;

        const headerHeight = header?.getBoundingClientRect().height ?? 0;
        const top = item.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      };

      setIsPinning(true);
      setOpenIndex(index);
      window.requestAnimationFrame(() => {
        pinItemToHeader();
        window.requestAnimationFrame(() => {
          pinItemToHeader();
          setIsPinning(false);
        });
      });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items]);

  const selectItem = (index: number, anchorId: string) => {
    const nextIndex = openIndex === index ? null : index;
    setOpenIndex(nextIndex);

    const nextUrl =
      nextIndex === null
        ? `${window.location.pathname}${window.location.search}`
        : `#${anchorId}`;
    window.history.replaceState(null, "", nextUrl);
  };

  const moveFocus = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const direction = {
      ArrowUp: -1,
      ArrowLeft: -1,
      ArrowDown: 1,
      ArrowRight: 1,
    }[event.key];

    if (!direction || items.length === 0) return;

    event.preventDefault();
    const nextIndex = (index + direction + items.length) % items.length;
    toggleRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      className="audience-accordion"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="audience-accordion__bounded" spacing="none">
        <div
          className={`audience-accordion__items${isPinning ? " is-pinning" : ""}`}
        >
          {items.map((item, index) => {
            const anchorId = getAnchorId(item.anchor_id, index);
            const panelId = `audience-panel-${anchorId}`;
            const isOpen = openIndex === index;

            return (
              <article
                className={`audience-accordion__item${isOpen ? " is-open" : ""}`}
                id={anchorId}
                key={`${anchorId}-${index}`}
              >
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className="audience-accordion__toggle"
                  onClick={() => selectItem(index, anchorId)}
                  onKeyDown={(event) => moveFocus(event, index)}
                  ref={(element) => {
                    toggleRefs.current[index] = element;
                  }}
                  type="button"
                >
                  <span aria-hidden="true" className="audience-accordion__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="audience-accordion__name">
                    {item.audience_name}
                  </span>
                  <span className="audience-accordion__summary">{item.summary}</span>
                </button>

                <div
                  aria-hidden={!isOpen}
                  className="audience-accordion__panel"
                  id={panelId}
                  inert={!isOpen ? true : undefined}
                >
                  <div className="audience-accordion__panel-inner">
                    <div className="audience-accordion__body">
                      <div className="audience-accordion__reading">
                        {item.heading ? (
                          <Heading
                            as="h2"
                            className="audience-accordion__heading"
                            color="inverse"
                            size="md"
                          >
                            {item.heading}
                          </Heading>
                        ) : null}

                        {isFilled.richText(item.body) ? (
                          <PrismicRichText
                            className="audience-accordion__copy"
                            field={item.body}
                          />
                        ) : null}

                        {isFilled.link(item.cta) && item.cta.text ? (
                          <TextLink
                            className="audience-accordion__link"
                            field={item.cta}
                            tone="light"
                          >
                            {item.cta.text}
                          </TextLink>
                        ) : null}
                      </div>

                      {isFilled.image(item.image) ? (
                        <figure className="audience-accordion__image">
                          <PrismicNextImage fallbackAlt="" field={item.image} />
                        </figure>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Bounded>
    </section>
  );
};

export default AudienceAccordion;
