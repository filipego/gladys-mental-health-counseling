# Project Overview

## Purpose

This repository is the content-driven website for Gladys Henriquez, a New York mental health counselor. It uses Next.js and Prismic CMS to present her therapy and parent-support services for parents, teens, and adults, with a clear path to request a free consultation.

The site uses the approved static prototypes in `prototypes/pages/` as its visual source of truth. The shared Inter typography, paper/blush/wine palette, page bounds, buttons, header, and footer are documented in `context/design-system.md`. The prototype-derived Hero is implemented and its published content is live on Home, About, Therapy & Support, and Get Started; remaining page sections continue to be implemented incrementally.

## Project Content

- Primary audience: parents concerned about their children, followed by teens and adults seeking therapy.
- Main pages: Home, About Gladys, Therapy & Support, and Get Started.
- Core action: “Request a free consultation,” leading to `/get-started#request`.
- Service details: in-person sessions in New York City, telehealth where available, English and Spanish sessions, fees starting at $200, and private insurance information.
- Content requirements: plain-language descriptions of parent support, teen therapy, adult therapy, approaches, session options, consultation flow, FAQs, privacy, and the emergency notice.

## Current Foundation

- Next.js App Router with TypeScript.
- React and Tailwind CSS.
- Prismic client integration through `src/prismicio.ts`.
- Slice Machine connected to the `mental-health-counseling` repository.
- Preview, exit-preview, revalidation, and slice-simulator routes.
- A synchronized non-repeatable `home` custom type.
- A local slice registry containing the published editorial, audience, location, FAQ, and consultation form slices.
- Shared slice primitives for section bounds, headings, links, CTA links, and Rich Text.
- A fully Prismic-backed global site shell whose header and footer copy and links come only from the published Settings singleton.
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
- Global singleton custom type: `settings`
- Current local slices: Hero, Content, Image, Video

The local slice library contains complete Hero, Content, Image, and Video models and React renderers. Hero provides exactly two layouts: Homepage Hero and Inner Page Hero. Content provides Text Only, Centered Text, Image Right, and Image Left editorial layouts; Image provides Full Width and Two Up; Video provides YouTube, uploaded-media, and external-link sources. The `settings` singleton owns editable global navigation and footer content. Continue to change all models through local Slice Machine rather than hand-editing model JSON.

## Deliberately Not Included

- Supabase or another database.
- Authentication, users, roles, or permissions.
- File storage or upload infrastructure.
- A component library or shared UI wrapper system.
- Tables, charts, global state, or notifications.
- Live consultation email delivery. The form and validated server boundary exist, but outbound Resend delivery remains intentionally disabled until credentials, the HTML email template, receiving policy, and fallback route are confirmed.
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
