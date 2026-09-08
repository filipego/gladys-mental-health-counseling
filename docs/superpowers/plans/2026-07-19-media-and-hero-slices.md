# Media and Hero Slices Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Image, Video, and Hero Prismic shared slices with synchronized models and reusable, accessible React renderers.

**Architecture:** Slice Machine owns the three slice models and generated types. Slice components consume the generated variation types, route all layout through `Bounded`, and delegate media and text to focused shared components.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS 4, Prismic, Slice Machine, `@prismicio/next`.

## Global Constraints

- Create and model slices with Slice Machine; never hand-edit slice model JSON or generated types.
- Every slice variation uses `Bounded` with `spacing` and `width` selects.
- Rich Text starts at H2 and does not render media.
- Use `ButtonLink` for CTAs and provider-specific components for YouTube and TikTok.
- Do not add a dependency unless the implementation requires it.

---

### Task 1: Create Slice Machine shells

**Files:**
- Create: `src/slices/Image/index.tsx` and Slice Machine model files
- Create: `src/slices/Video/index.tsx` and Slice Machine model files
- Create: `src/slices/Hero/index.tsx` and Slice Machine model files
- Modify: `src/slices/index.ts`

- [ ] Run `npx prismic slicemachine --create-slice --sliceName Image --library ./src/slices`.
- [ ] Run the equivalent command for Video and Hero.
- [ ] Confirm `npx prismic slicemachine --list` lists all three slices.

### Task 2: Model editor fields in Slice Machine

**Files:**
- Modify through Slice Machine only: Image, Video, and Hero slice model files.

- [ ] Add Image `Full Width` and `Two Up` variations with image fields and `spacing`/`width` selects.
- [ ] Add Video YouTube, Uploaded Video, and External Video File variations with their specified media fields, optional poster/title fields, and `spacing`/`width` selects.
- [ ] Add Hero Centered, Split, and Minimal variations with eyebrow, heading, body Rich Text, image where appropriate, repeatable CTA links/style selects, and `spacing`/`width` selects.
- [ ] Push no model changes; leave publication to the user.

### Task 3: Add native lazy video rendering

**Files:**
- Create: `src/app/components/LazyVideo.tsx`

- [ ] Implement `LazyVideo` with `src`, `title`, optional `poster`, `className`, `rootMargin`, `autoPlay`, `loop`, and `controls` props.
- [ ] Use `useLazyIframe` to defer mounting the native `<video>` element until it approaches the viewport.
- [ ] Return `null` for an empty source and set `muted` when autoplay is selected.

### Task 4: Implement slice components

**Files:**
- Modify: `src/slices/Image/index.tsx`
- Modify: `src/slices/Video/index.tsx`
- Modify: `src/slices/Hero/index.tsx`

- [ ] Render Image variations with `PrismicNextImage` and responsive single/two-column layouts.
- [ ] Render Video variations with `LazyYouTubePlayer` or `LazyVideo`.
- [ ] Render Hero variations with `Heading`, `PrismicRichText`, `PrismicNextImage`, and up to two `ButtonLink` CTAs.
- [ ] Handle absent optional fields by omitting them; return `null` for invalid required media.

### Task 5: Verify and document

**Files:**
- Modify: relevant `context/*.md` and `AGENTS.md`

- [ ] Start Slice Machine and confirm each variation renders in `/slice-simulator` with its mock content.
- [ ] Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- [ ] Update project guidance and `context/progress-tracker.md` with the completed slices and publishing next step.
