# Project Overview

## Purpose

This repository is a minimal Studio In The Box starter for content-driven websites built with Next.js and Prismic CMS. It provides a clean framework scaffold and the standard Prismic integration without imposing a client product, design system, database, authentication flow, or business domain.

## Current Foundation

- Next.js App Router with TypeScript.
- React and Tailwind CSS.
- Prismic client integration through `src/prismicio.ts`.
- Slice Machine connected to the `mental-health-counseling` repository.
- Preview, exit-preview, revalidation, and slice-simulator routes.
- A synchronized non-repeatable `home` custom type.
- A local slice registry containing Hero, Content, Image, and Video.
- Shared slice primitives for section bounds, headings, links, CTA links, and Rich Text.
- Lazy YouTube and TikTok components for dedicated provider-ID fields.

## Current Routes

| Route | Purpose |
| --- | --- |
| `/` | Non-repeatable Prismic Home document |
| `/:uid` | Repeatable Prismic Page document |
| `/slice-simulator` | Local rendering surface used by Slice Machine |
| `/api/preview` | Enables Prismic previews |
| `/api/exit-preview` | Exits preview mode |
| `/api/revalidate` | Handles Prismic revalidation |

## Prismic Repository

- Repository name: `mental-health-counseling`
- Local model library: `customtypes/`
- Local slice library: `src/slices/`
- Current custom type: `home`
- Current local slices: Hero, Content, Image, Video

The local slice library contains complete Hero, Content, Image, and Video models and React renderers. Hero provides Centered, Split, and Minimal layouts; Content provides Text Only, Centered Text, Image Right, and Image Left editorial layouts; Image provides Full Width and Two Up; Video provides YouTube, uploaded-media, and external-link sources. Continue to change their models through local Slice Machine rather than hand-editing model JSON.

## Deliberately Not Included

- Supabase or another database.
- Authentication, users, roles, or permissions.
- File storage or upload infrastructure.
- A component library or shared UI wrapper system.
- Forms, tables, charts, global state, or notifications.
- Client-specific routes, copy, content models, or design tokens.
- Rich Text image or video embeds. TikTok and YouTube use dedicated components; images will use a dedicated component when added.

Add any of these only when a concrete project requirement calls for them.

## Starter Success Criteria

- The application stays easy to specialize for a new Prismic website.
- Content models and slices remain synchronized through Slice Machine.
- Prismic queries use the centralized client.
- New project assumptions are documented only after they become real requirements.
- Rich Text has one consistent rendering path: H2-H6, body text, lists, code, and inline links. H1 and media stay outside it.
- Linting, TypeScript checking, and production builds remain healthy.
