# Full-Image Homepage Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a selectable Prismic homepage hero variation that uses a full-bleed background image while preserving the current copy geometry and existing hero variations.

**Architecture:** Slice Machine owns a new `fullImage` variation with one `background_image` field and the existing homepage copy fields. The Hero renderer selects a dedicated visual class for the variation. A small client observer applies the transparent header state only while that hero intersects the sticky header.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Prismic, Slice Machine, CSS, Node test runner.

## Global Constraints

- Preserve the existing uncommitted homepage hero and wine-button changes.
- Do not hand-edit Slice Machine model JSON or generated Prismic types.
- Keep the existing hero height and copy position for the first visual test.
- Keep all non-home routes and existing Hero variations visually unchanged.
- Use the supplied chair image as the new variation's background.

---

### Task 1: Add the Prismic variation

**Files:**
- Modify through Slice Machine: `src/slices/Hero/model.json`
- Regenerate through Slice Machine: `prismicio-types.d.ts`

**Interfaces:**
- Produces: Hero variation `fullImage` with `heading`, `lead`, `background_image`, `ctas`, `supporting_copy`, and `helper_copy`.

- [ ] Duplicate Homepage Hero in Slice Machine.
- [ ] Rename it `Full Image Homepage Hero` with API ID `fullImage`.
- [ ] Rename the image field to `Background image` with API ID `background_image`.
- [ ] Save and confirm generated types expose `variation: "fullImage"`.

### Task 2: Render the new variation and header state

**Files:**
- Modify: `src/slices/Hero/index.tsx`
- Create: `src/app/components/HeroHeaderObserver.tsx`
- Modify: `src/app/components/SiteHeader.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `Content.HeroSlice` variation `fullImage`.
- Produces: `.hero--homepage-image` surface and `.site-header--over-image-hero` transient header state.

- [ ] Add a focused server-render test for the variation.
- [ ] Render the background image in an absolute full-bleed layer.
- [ ] Reuse the existing homepage copy and CTA markup.
- [ ] Observe the new hero and toggle the header overlay class at its lower boundary.
- [ ] Add scoped desktop/mobile styles without changing existing hero selectors.

### Task 3: Populate and verify Home

**Files:**
- Modify: `context/progress-tracker.md`

**Interfaces:**
- Consumes: the published Home document and supplied chair image.
- Produces: a rendered Home using Full Image Homepage Hero.

- [ ] Push the Hero model through Slice Machine after authentication is confirmed.
- [ ] Upload and select the supplied image in the Home document.
- [ ] Copy the existing Homepage Hero text and links into the new variation and publish Home.
- [ ] Run `npm test`, `npm run lint`, and `npx tsc --noEmit`.
- [ ] Verify desktop and 390px Home plus one inner page in the Codex in-app browser.
- [ ] Record the completed variation and verification in the progress tracker.
