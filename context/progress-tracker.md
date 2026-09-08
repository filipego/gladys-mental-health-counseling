# Progress Tracker

## Current Status

**Phase:** Starter foundation complete

**Last completed:** Added and pushed the reusable Content slice with four editorial layout variations.

**Next:** Add representative Content slice entries to the test page and visually verify all four variations alongside the existing slices.

## Completed

- [x] Scaffolded Next.js 16 App Router with TypeScript and Tailwind CSS.
- [x] Installed Prismic client, React, Next.js, and Slice Machine integrations.
- [x] Connected Slice Machine to `mental-health-counseling`.
- [x] Authenticated the Prismic CLI account used during setup.
- [x] Synchronized the existing `home` custom type.
- [x] Added preview, exit-preview, revalidation, and slice simulator routes.
- [x] Verified linting, TypeScript, production build, the app, simulator route, and Slice Machine.
- [x] Removed unrelated Supabase, admin dashboard, storage, auth, and nonexistent UI-system guidance from project context.
- [x] Added `Bounded` with editor-friendly spacing and width options for slice layouts.
- [x] Added shared `Heading`, `PrismicLink`, and `ButtonLink` primitives using the semantic colors in `globals.css`.
- [x] Added one `PrismicRichText` renderer for typography, lists, code blocks, and inline links.
- [x] Established that Rich Text body content starts at H2 and excludes embedded media.
- [x] Added lazy, accessible YouTube and TikTok player components for dedicated video fields.
- [x] Added Image Full Width and Two Up variations.
- [x] Added Video YouTube, Uploaded Video, and External Video variations.
- [x] Added Hero Centered, Split, and Minimal variations with repeatable styled CTAs.
- [x] Added Content Text Only, Centered Text, Image Right, and Image Left variations with shared Rich Text, CTA, spacing, and width controls.
- [x] Pushed the Content slice model to the Page Builder and added automated render tests for its centered and image-left variations.
- [x] Added editor-facing Section spacing and Content width controls to every variation.
- [x] Added automated render tests for Hero, Image, and Video.
- [x] Rendered the non-repeatable Home document at `/` with Prismic metadata.
- [x] Rendered repeatable Page documents at `/:uid` with metadata and static parameters.

## Current Limitations

- No project-specific visual system or component library has been established.
- Slice screenshots and representative repository content have not been added yet.
- The shared colors are deliberately generic starter tokens and still need project-specific art direction.

## Upcoming

- Verify previews and revalidation against published and draft content.
- Create a test page containing every slice variation and perform responsive visual QA.
- Add Slice Machine screenshots once representative mock data is available.

## Decisions

- This starter is Next.js plus Prismic only.
- Supabase is not part of the architecture.
- Authentication, databases, storage, UI libraries, and other services will be added only when required.
- Content models remain owned by Slice Machine.
- Shared Rich Text styling is owned by `src/app/components/PrismicRichText.tsx`, not individual slices.
- H1 is not used in Rich Text body content; page titles are separate from editorial prose.
- Context files describe only systems that actually exist.
