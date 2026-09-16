import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Content } from "@prismicio/client";

import Hero from "./Hero";
import ContentSlice from "./Content";
import ImageSliceComponent from "./Image";
import ImageAndText from "./ImageAndText";
import HeadingAndText from "./HeadingAndText";
import InformationGrid from "./InformationGrid";
import CallToAction from "./CallToAction";
import Video from "./Video";

const imageField = (url: string) => ({
  id: url,
  url,
  alt: "Test image",
  copyright: null,
  dimensions: { width: 1200, height: 800 },
});

test("Content renders centered editorial copy without an H1", () => {
  const slice = {
    slice_type: "content",
    slice_label: null,
    id: "content-centered-test",
    variation: "centeredText",
    version: "initial",
    primary: {
      eyebrow: "Overview",
      heading: "Clear, focused content",
      body: [{ type: "paragraph", text: "Supporting copy.", spans: [] }],
      ctas: [],
      spacing: "compact",
      width: "narrow",
    },
    items: [],
  } as unknown as Content.ContentSlice;

  const html = renderToStaticMarkup(
    <ContentSlice context={{}} index={0} slice={slice} slices={[slice]} />,
  );

  assert.match(html, /<h2[^>]*>Clear, focused content<\/h2>/);
  assert.doesNotMatch(html, /<h1/);
  assert.doesNotMatch(html, /Overview/);
  assert.match(html, /text-center/);
  assert.match(html, /py-8/);
  assert.match(html, /max-w-4xl/);
});

test("Content renders an image-left layout with shared CTA styling", () => {
  const slice = {
    slice_type: "content",
    slice_label: null,
    id: "content-image-left-test",
    variation: "imageLeft",
    version: "initial",
    primary: {
      eyebrow: null,
      heading: "Content beside an image",
      body: [{ type: "paragraph", text: "Supporting copy.", spans: [] }],
      image: imageField("https://images.example.com/content.jpg"),
      ctas: [
        {
          label: "Read more",
          link: {
            link_type: "Web",
            url: "https://example.com",
            target: null,
            variant: "Secondary",
          },
        },
      ],
      spacing: "none-above",
      width: "full",
    },
    items: [],
  } as unknown as Content.ContentSlice;

  const html = renderToStaticMarkup(
    <ContentSlice context={{}} index={0} slice={slice} slices={[slice]} />,
  );

  assert.match(html, /lg:grid-cols-2/);
  assert.match(html, /order-2/);
  assert.match(html, /border-border bg-background/);
  assert.match(html, /pt-0/);
  assert.match(html, /max-w-none/);
});

test("Homepage Hero renders semantic copy, CTA, helper, and animation poster", () => {
  const slice = {
    slice_type: "hero",
    slice_label: null,
    id: "hero-test",
    variation: "default",
    version: "initial",
    primary: {
      heading: "A useful hero",
      lead: [{ type: "paragraph", text: "A clear lead.", spans: [] }],
      supporting_copy: [
        { type: "paragraph", text: "Supporting copy.", spans: [] },
      ],
      helper_copy: [
        { type: "paragraph", text: "A helpful next-step note.", spans: [] },
      ],
      animation_poster: imageField("https://images.example.com/hero.jpg"),
      ctas: [
        {
          label: "Learn more",
          link: {
            link_type: "Web",
            url: "https://example.com",
            target: null,
            variant: "Outline",
          },
        },
      ],
    },
    items: [],
  } as unknown as Content.HeroSlice;

  const html = renderToStaticMarkup(
    <Hero context={{ pageUid: "home" }} index={0} slice={slice} slices={[slice]} />,
  );

  assert.match(html, /<h1[^>]*>A useful hero<\/h1>/);
  assert.match(html, /hero__lead/);
  assert.match(html, /A clear lead/);
  assert.match(html, /hero__supporting/);
  assert.match(html, /hero__helper/);
  assert.match(html, /A helpful next-step note/);
  assert.match(html, />Learn more<\/span>/);
  assert.match(html, /<svg aria-hidden="true" class="size-4"/);
  assert.match(html, /border-border bg-transparent/);
  assert.match(html, /hero__animation-stage/);
  assert.match(html, /hero--home/);
  assert.match(html, /hero__button--primary/);
  assert.match(html, /py-0/);
});

test("Inner Page Hero shares the global copy classes and portrait layout", () => {
  const slice = {
    slice_type: "hero",
    slice_label: null,
    id: "inner-hero-test",
    variation: "split",
    version: "initial",
    primary: {
      heading: "About Gladys",
      lead: [{ type: "paragraph", text: "A conversational lead.", spans: [] }],
      supporting_copy: [
        { type: "paragraph", text: "Shared supporting copy.", spans: [] },
      ],
      image: imageField("https://images.example.com/portrait.jpg"),
      ctas: [],
    },
    items: [],
  } as unknown as Content.HeroSlice;

  const html = renderToStaticMarkup(
    <Hero context={{ pageUid: "about" }} index={0} slice={slice} slices={[slice]} />,
  );

  assert.match(html, /<h1[^>]*>About<span class="hero__title-line">Gladys<\/span><\/h1>/);
  assert.match(html, /hero--inner/);
  assert.match(html, /hero--about/);
  assert.match(html, /hero__lead/);
  assert.match(html, /hero__supporting/);
  assert.match(html, /hero__portrait/);
  assert.doesNotMatch(html, /hero__actions/);
});

test("Image Two Up renders both images with editor-selected layout", () => {
  const slice = {
    slice_type: "image",
    slice_label: null,
    id: "image-test",
    variation: "twoUp",
    version: "initial",
    primary: {
      image: imageField("https://images.example.com/one.jpg"),
      second_image: imageField("https://images.example.com/two.jpg"),
      spacing: "none-above",
      width: "full",
    },
    items: [],
  } as unknown as Content.ImageSlice;

  const html = renderToStaticMarkup(
    <ImageSliceComponent
      context={{}}
      index={0}
      slice={slice}
      slices={[slice]}
    />,
  );

  assert.equal((html.match(/<img/g) ?? []).length, 2);
  assert.match(html, /md:grid-cols-2/);
  assert.match(html, /pt-0/);
  assert.match(html, /max-w-none/);
});

test("Video variations apply editor-selected spacing and width", () => {
  const slice = {
    slice_type: "video",
    slice_label: null,
    id: "video-test",
    variation: "externalVideo",
    version: "initial",
    primary: {
      title: "Product demo",
      poster: imageField("https://images.example.com/poster.jpg"),
      video_url: {
        link_type: "Web",
        url: "https://media.example.com/demo.mp4",
        target: null,
      },
      spacing: "none-below",
      width: "standard",
    },
    items: [],
  } as unknown as Content.VideoSlice;

  const html = renderToStaticMarkup(
    <Video context={{}} index={0} slice={slice} slices={[slice]} />,
  );

  assert.match(html, /pb-0/);
  assert.match(html, /max-w-page/);
});

test("Image and Text renders shared primitives and independent appearance controls", () => {
  const slice = {
    slice_type: "image_and_text",
    slice_label: null,
    id: "image-and-text-test",
    variation: "default",
    version: "initial",
    primary: {
      image: imageField("https://images.example.com/profile.jpg"),
      heading: "What it is like to work together",
      body: [
        {
          type: "paragraph",
          text: "Body copy with a link.",
          spans: [
            {
              start: 17,
              end: 21,
              type: "hyperlink",
              data: {
                link_type: "Web",
                url: "https://example.com/body-link",
                target: null,
              },
            },
          ],
        },
      ],
      link: {
        link_type: "Web",
        url: "https://example.com/about",
        target: null,
        text: "Learn more",
      },
      supporting_heading: "Supporting heading",
      supporting_body: [
        { type: "paragraph", text: "Supporting copy.", spans: [] },
      ],
      add_background_color: true,
      add_top_border: true,
      add_bottom_border: false,
    },
    items: [],
  } as unknown as Content.ImageAndTextSlice;

  const html = renderToStaticMarkup(
    <ImageAndText context={{}} index={0} slice={slice} slices={[slice]} />,
  );

  assert.match(html, /image-and-text--background/);
  assert.match(html, /image-and-text--border-top/);
  assert.doesNotMatch(html, /image-and-text--border-bottom/);
  assert.match(html, /<h2[^>]*>What it is like to work together<\/h2>/);
  assert.match(html, /Body copy/);
  assert.match(html, /href="https:\/\/example\.com\/body-link"/);
  assert.match(html, /text-link--light/);
  assert.match(html, />Learn more<\/span>/);
  assert.match(html, /<h3[^>]*>Supporting heading<\/h3>/);
  assert.match(html, /Supporting copy/);
});

test("Heading and Text renders side-by-side copy and an optional shared link", () => {
  const slice = {
    slice_type: "heading_and_text",
    slice_label: null,
    id: "heading-and-text-side-test",
    variation: "default",
    version: "initial",
    primary: {
      heading: "When something feels off",
      body: [
        { type: "paragraph", text: "First paragraph.", spans: [] },
        { type: "paragraph", text: "Second paragraph.", spans: [] },
      ],
      link: {
        link_type: "Web",
        url: "https://example.com/support",
        target: null,
        text: "Read about support",
      },
    },
    items: [],
  } as unknown as Content.HeadingAndTextSlice;

  const html = renderToStaticMarkup(
    <HeadingAndText
      context={{ pageUid: "home" }}
      index={0}
      slice={slice}
      slices={[slice]}
    />,
  );

  assert.match(html, /heading-and-text--side-by-side/);
  assert.match(html, /heading-and-text--home/);
  assert.match(html, /<h2[^>]*>When something feels off<\/h2>/);
  assert.match(html, /First paragraph/);
  assert.match(html, /Second paragraph/);
  assert.match(html, /text-link--dark/);
  assert.match(html, />Read about support<\/span>/);
});

test("Heading and Text renders two independent Rich Text columns", () => {
  const slice = {
    slice_type: "heading_and_text",
    slice_label: null,
    id: "heading-and-text-columns-test",
    variation: "twoColumns",
    version: "initial",
    primary: {
      heading: "Understand the life around the problem",
      left_body: [
        { type: "paragraph", text: "Left column copy.", spans: [] },
      ],
      right_body: [
        { type: "paragraph", text: "Right column copy.", spans: [] },
      ],
    },
    items: [],
  } as unknown as Content.HeadingAndTextSlice;

  const html = renderToStaticMarkup(
    <HeadingAndText
      context={{ pageUid: "about" }}
      index={0}
      slice={slice}
      slices={[slice]}
    />,
  );

  assert.match(html, /heading-and-text--two-columns/);
  assert.match(html, /heading-and-text--about/);
  assert.match(html, /Left column copy/);
  assert.match(html, /Right column copy/);
  assert.doesNotMatch(html, /text-link/);
});

test("Information Grid renders repeatable CMS items with shared rich text", () => {
  const slice = {
    slice_type: "information_grid",
    slice_label: null,
    id: "information-grid-test",
    variation: "default",
    version: "initial",
    primary: {
      heading: "Practical details",
      items: [
        {
          heading: "In person",
          body: [{ type: "paragraph", text: "A first detail.", spans: [] }],
        },
        {
          heading: "Online",
          body: [{ type: "paragraph", text: "A second detail.", spans: [] }],
        },
      ],
    },
    items: [],
  } as unknown as Content.InformationGridSlice;

  const html = renderToStaticMarkup(
    <InformationGrid
      context={{ pageUid: "get-started" }}
      index={0}
      slice={slice}
      slices={[slice]}
    />,
  );

  assert.match(html, /information-grid--get-started/);
  assert.match(html, /<dl class="information-grid__items">/);
  assert.match(html, /<h3[^>]*>In person<\/h3>/);
  assert.match(html, /A first detail/);
  assert.match(html, /A second detail/);
});

test("Call to Action uses shared heading, rich text, and button primitives", () => {
  const slice = {
    slice_type: "call_to_action",
    slice_label: null,
    id: "call-to-action-test",
    variation: "default",
    version: "initial",
    primary: {
      heading: "Start with a conversation",
      body: [{ type: "paragraph", text: "Introductory copy.", spans: [] }],
      link: {
        link_type: "Web",
        url: "https://example.com/start",
        target: null,
        text: "Request a consultation",
      },
      helper_text: [
        { type: "paragraph", text: "A short helper note.", spans: [] },
      ],
    },
    items: [],
  } as unknown as Content.CallToActionSlice;

  const html = renderToStaticMarkup(
    <CallToAction context={{}} index={0} slice={slice} slices={[slice]} />,
  );

  assert.match(html, /<h2[^>]*>Start with a conversation<\/h2>/);
  assert.match(html, /Introductory copy/);
  assert.match(html, /call-to-action__button/);
  assert.match(html, />Request a consultation<\/span>/);
  assert.match(html, /A short helper note/);
});
