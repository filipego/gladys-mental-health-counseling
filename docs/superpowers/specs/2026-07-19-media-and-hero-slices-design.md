# Media and Hero Slices Design

## Goal

Add three reusable Prismic shared slices: Image, Video, and Hero. Each slice uses the existing `Bounded` layout primitive and gives editors straightforward, named choices rather than CSS controls.

## Shared Slice Settings

Every variation includes these selects:

- **Section spacing:** `standard`, `compact`, `none`, `none-above`, or `none-below`.
- **Content width:** `standard`, `narrow`, or `full`.

Slice components pass these values to `Bounded`.

## Image Slice

### Full Width variation

- One required Prismic Image field.
- Rendered through `PrismicNextImage` inside `Bounded`.
- The image fills the chosen content width while preserving its natural aspect ratio.

### Two Up variation

- Two required Prismic Image fields: left and right.
- Rendered in a two-column grid that becomes one column on smaller screens.
- Both images preserve their natural aspect ratio.

No captions, galleries, carousels, or linked images are included in this starter slice.

## Video Slice

### YouTube variation

- A required YouTube video ID Key Text field.
- Optional descriptive title Key Text field.
- Rendered with `LazyYouTubePlayer`.

### Uploaded Video variation

- A required Link to Media field for a video uploaded to the Prismic Media Library.
- Optional poster Image and descriptive title Key Text fields.
- Rendered with a native lazy video component.

### External Video File variation

- A required web Link field containing a direct video-file URL such as an MP4.
- Optional poster Image and descriptive title Key Text fields.
- Rendered with the same native lazy video component.

The Video slice does not accept generic embed URLs. Provider-specific embeds remain explicit so loading, layout, controls, and accessibility are predictable.

## Hero Slice

All Hero variations support an optional eyebrow, required heading, optional body Rich Text, optional image, and up to two CTA items. Each CTA item contains a Link field and a button-style select: `primary`, `secondary`, or `outline`.

### Centered variation

Centered text and CTAs, with an optional image below.

### Split variation

Text and CTAs beside an optional image; the layout stacks on smaller screens.

### Minimal variation

Text and CTAs only, without media layout.

Hero headings render through `Heading` as H2 to follow the project rule that page content starts at H2.

## Rendering Boundaries

- `Bounded` wraps every slice variation.
- `PrismicNextImage` renders all slice image fields.
- `LazyYouTubePlayer` renders YouTube IDs.
- A new native lazy-video component renders uploaded and direct-file videos.
- `PrismicRichText` renders Hero body text.
- `ButtonLink` renders Hero CTAs.
- Rich Text remains limited to typography and inline links; it does not render images or video.

## Error and Empty-State Behavior

- Empty optional image, video, body, eyebrow, and CTA fields are omitted.
- A slice with no usable required media field returns `null` rather than emitting a broken player.
- Video iframes and native video elements receive accessible titles or labels.

## Verification

1. Create and model slices through Slice Machine; do not hand-edit model JSON.
2. Confirm generated slice types and registry update.
3. Test each variation in the Slice Simulator with sample content.
4. Run lint, TypeScript, and a production build.
5. Update project context with the actual slice and media-component rules.
