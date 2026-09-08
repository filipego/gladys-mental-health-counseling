import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Content } from "@prismicio/client";

import Hero from "./Hero";
import ContentSlice from "./Content";
import ImageSliceComponent from "./Image";
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
  assert.match(html, /border-secondary bg-secondary/);
  assert.match(html, /pt-0/);
  assert.match(html, /max-w-none/);
});

test("Hero renders editorial content and CTA styles without an H1", () => {
  const slice = {
    slice_type: "hero",
    slice_label: null,
    id: "hero-test",
    variation: "default",
    version: "initial",
    primary: {
      eyebrow: "Introduction",
      heading: "A useful hero",
      body: [{ type: "paragraph", text: "Supporting copy.", spans: [] }],
      image: imageField("https://images.example.com/hero.jpg"),
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
      spacing: "compact",
      width: "narrow",
    },
    items: [],
  } as unknown as Content.HeroSlice;

  const html = renderToStaticMarkup(
    <Hero context={{}} index={0} slice={slice} slices={[slice]} />,
  );

  assert.match(html, /<h2[^>]*>A useful hero<\/h2>/);
  assert.doesNotMatch(html, /<h1/);
  assert.match(html, />Learn more<\/a>/);
  assert.match(html, /border-primary bg-transparent/);
  assert.match(html, /py-8/);
  assert.match(html, /max-w-4xl/);
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
  assert.match(html, /max-w-6xl/);
});
