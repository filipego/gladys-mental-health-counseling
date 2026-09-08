# Project Overview

## Purpose

This repository is the content-driven website for Gladys Henriquez, a New York mental health counselor. It uses Next.js and Prismic CMS to present her therapy and parent-support services for parents, teens, and adults, with a clear path to request a free consultation.

The site is intentionally being built from a clean technical foundation. Visual direction, imagery, and project-specific styling will be defined separately from the content and architecture documented here.

## Project Content

- Primary audience: parents concerned about their children, followed by teens and adults seeking therapy.
- Main pages: Home, About Gladys, Therapy & Support, and Get Started.
- Core action: “Request a free consultation,” leading to `/get-started#consultation`.
- Service details: in-person sessions in New York City, telehealth where available, English and Spanish sessions, fees starting at $200, and private insurance information.
- Content requirements: plain-language descriptions of parent support, teen therapy, adult therapy, approaches, session options, consultation flow, FAQs, privacy, and the emergency notice.

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

## Website Success Criteria

- Visitors can quickly understand who Gladys works with and how to request a consultation.
- The application keeps content easy to update in Prismic as Gladys confirms service and practice details.
- Content models and slices remain synchronized through Slice Machine.
- Prismic queries use the centralized client.
- New project assumptions are documented only after they become real requirements.
- Rich Text has one consistent rendering path: H2-H6, body text, lists, code, and inline links. H1 and media stay outside it.
- Linting, TypeScript checking, and production builds remain healthy.
