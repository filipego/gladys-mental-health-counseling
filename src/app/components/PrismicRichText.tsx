import {
  PrismicRichText as BasePrismicRichText,
  type PrismicRichTextProps as BasePrismicRichTextProps,
  type RichTextComponents,
} from "@prismicio/react";
import clsx from "clsx";

import { Heading } from "./Heading";
import { PrismicLink } from "./PrismicLink";

export type PrismicRichTextProps = Omit<
  BasePrismicRichTextProps,
  "components"
> & {
  /** Adds layout-specific styles without changing the shared rich-text rules. */
  className?: string;
  /** Rare, local overrides layered on top of the shared renderer. */
  components?: RichTextComponents;
};

/**
 * The single renderer for Prismic Rich Text fields in this project.
 *
 * Rich text is limited to typography and inline links. Media belongs in the
 * project's dedicated image and video components rather than inside prose.
 */
export function PrismicRichText({
  className,
  components,
  linkResolver,
  ...props
}: PrismicRichTextProps) {
  const defaultComponents: RichTextComponents = {
    // H1 is intentionally not supported in body rich text. Page titles live
    // outside this component, and editorial content starts at H2.
    heading1: () => null,
    heading2: ({ children, key }) => (
      <Heading as="h2" className="rich-text__heading rich-text__heading--2" key={key} size="md">
        {children}
      </Heading>
    ),
    heading3: ({ children, key }) => (
      <Heading as="h3" className="rich-text__heading rich-text__heading--3" key={key} size="sm">
        {children}
      </Heading>
    ),
    heading4: ({ children, key }) => (
      <Heading as="h4" className="rich-text__heading rich-text__heading--4" key={key} size="xs">
        {children}
      </Heading>
    ),
    heading5: ({ children, key }) => (
      <Heading as="h5" className="rich-text__heading rich-text__heading--5" key={key} size="xs">
        {children}
      </Heading>
    ),
    heading6: ({ children, key }) => (
      <Heading as="h6" className="rich-text__heading rich-text__heading--6" key={key} size="xs">
        {children}
      </Heading>
    ),
    paragraph: ({ children, key }) => (
      <p className="rich-text__paragraph" key={key}>
        {children}
      </p>
    ),
    list: ({ children, key }) => (
      <ul className="rich-text__list rich-text__list--unordered" key={key}>
        {children}
      </ul>
    ),
    oList: ({ children, key }) => (
      <ol className="rich-text__list rich-text__list--ordered" key={key}>
        {children}
      </ol>
    ),
    listItem: ({ children, key }) => (
      <li className="rich-text__list-item" key={key}>
        {children}
      </li>
    ),
    oListItem: ({ children, key }) => (
      <li className="rich-text__list-item" key={key}>
        {children}
      </li>
    ),
    strong: ({ children, key }) => (
      <strong className="font-semibold" key={key}>
        {children}
      </strong>
    ),
    em: ({ children, key }) => (
      <em className="italic" key={key}>
        {children}
      </em>
    ),
    hyperlink: ({ children, key, node }) => (
      <PrismicLink field={node.data} key={key} linkResolver={linkResolver}>
        {children}
      </PrismicLink>
    ),
    preformatted: ({ children, key }) => (
      <pre className="rich-text__preformatted" key={key}>
        <code>{children}</code>
      </pre>
    ),
    label: ({ children, key }) => <span key={key}>{children}</span>,
    // Spans are leaf nodes in Prismic's serializer, so they provide `text`
    // rather than nested children. Preserve its line-break behavior here.
    span: ({ text, key }) => (
      <span key={key}>
        {text.split("\n").map((line, index) => (
          <span key={`${key ?? "span"}-${index}`}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </span>
    ),
    // Media stays in dedicated components, not in generic editorial prose.
    image: () => null,
    embed: () => null,
  };

  return (
    <div className={clsx("rich-text", className)}>
      <BasePrismicRichText
        {...props}
        components={{ ...defaultComponents, ...components }}
        linkResolver={linkResolver}
      />
    </div>
  );
}
