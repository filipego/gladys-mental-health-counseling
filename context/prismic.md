# Prismic Workflow

## Connection

The project is connected to the Prismic repository `mental-health-counseling` through `slicemachine.config.json`.

```json
{
  "repositoryName": "mental-health-counseling",
  "adapter": "@slicemachine/adapter-next",
  "libraries": ["./src/slices"],
  "localSliceSimulatorURL": "http://localhost:3000/slice-simulator"
}
```

`src/prismicio.ts` derives the Content API endpoint from this repository name and enables Next.js previews.

## Local Commands

Install dependencies and start the application:

```bash
npm install
npm run dev
```

Run Slice Machine in a separate terminal:

```bash
npm run slicemachine
```

Slice Machine runs at `http://localhost:9999`. The Next.js slice simulator runs at `http://localhost:3000/slice-simulator` while the app is running.

## Model and Slice Rules

- Treat local Slice Machine at `http://localhost:9999` as the source of truth for this starter's custom types and shared slices.
- Create and edit models with `npm run slicemachine`, review the generated changes locally, then use Slice Machine's Push action to publish them to the repository.
- Do not use the cloud Type Builder to edit the same model while local changes are pending. Do not use “Pull to local” unless intentionally replacing the local model with the published cloud schema.
- Never hand-edit JSON under `customtypes/`.
- Never hand-edit slice model JSON.
- Do not hand-edit `prismicio-types.d.ts` or `src/slices/index.ts`; they are generated.
- Slice React components under `src/slices/<SliceName>/index.tsx` are application code and may be implemented normally after Slice Machine creates them.
- Keep slice components typed using generated Prismic types.
- Render page slice zones with `SliceZone` from `@prismicio/react` and `components` from `@/slices`.

## Query Pattern

Server Components should use the centralized client:

```tsx
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home");

  return <SliceZone slices={page.data.slices} components={components} />;
}
```

Add error handling appropriate to the route before using this as production page code.

## Rich Text Rules

Render every Prismic Rich Text field with the shared component:

```tsx
import { PrismicRichText } from "@/app/components/PrismicRichText";

<PrismicRichText field={slice.primary.body} />;
```

The component consistently renders paragraphs, H2-H6, ordered and unordered lists, bold text, italics, code blocks, and inline links. It uses `Heading` for headings and `PrismicLink` for inline links.

For ordinary body fields in Slice Machine:

- Enable paragraph, H2-H6 only as needed, strong, emphasis, hyperlink, and ordered/unordered lists.
- Keep H1 disabled. Page titles should be separate fields or components.
- Keep image and embed options disabled. Use dedicated project components and fields instead; YouTube and TikTok video fields can use `LazyYouTubePlayer` and `LazyTikTokPlayer` now, while images will get their own component when needed.
- Use a dedicated Link field plus `ButtonLink` for calls to action; do not turn hyperlinks inside prose into buttons.

Do not write another Rich Text serializer inside a slice. `PrismicRichText` accepts a rare local component-map override when an intentional exception is needed.

## Route Resolver

Route resolver entries live in `src/prismicio.ts`. Add entries when a Prismic page type maps to an application route. Keep type IDs synchronized with `customtypes/`.

For the current non-repeatable `home` type, the intended route mapping is:

```ts
{ type: "home", path: "/" }
```

The active mappings are:

```ts
{ type: "home", path: "/" }
{ type: "page", path: "/:uid" }
```

## Current Model State

- `home` is a non-repeatable page type.
- It contains a slice zone and SEO metadata fields.
- Its slice zone currently references a `hero` shared slice.
- Shared presentational components are available in `src/app/components`, including `Bounded`, `Heading`, `PrismicLink`, `ButtonLink`, and `PrismicRichText`.
- The generated local registry contains Hero, Content, Image, and Video.
- Content has Text Only, Centered Text, Image Right, and Image Left variations. It shares the same editor-facing eyebrow, H2 heading, Rich Text body, optional CTA group, Section spacing, and Content width controls as the rest of the starter. Its image-side variations add one dedicated Image field.
- Image has Full Width and Two Up variations.
- Video has YouTube, Uploaded Video, and External Video variations.
- Hero has Centered, Split, and Minimal variations. Hero headings render as H2, and its repeatable CTA links expose Primary, Secondary, and Outline variants.
- All three slices expose the shared editor-facing Section spacing and Content width controls consumed by `Bounded`.
- Dedicated YouTube fields render with `LazyYouTubePlayer`. Uploaded and external video fields render with `LazyVideo`; TikTok remains available as a shared primitive for a future dedicated field.
- `/` queries and renders the non-repeatable Home document. `/:uid` queries repeatable Page documents, generates their metadata, and pre-renders published UIDs at build time.

## Preview and Revalidation

- `/api/preview` enables Prismic previews.
- `/api/exit-preview` exits preview mode.
- `/api/revalidate` handles cache revalidation.
- `enableAutoPreviews()` is configured in `src/prismicio.ts`.

Preserve these routes and the client integration unless an intentional architecture change replaces them.

## Repository Changes

If reconnecting this starter to another Prismic repository, use the official Slice Machine initializer or supported Slice Machine workflow. Confirm the target account and repository before replacing `repositoryName`, then synchronize models and regenerate types. Do not guess CLI syntax; inspect current command help first.
