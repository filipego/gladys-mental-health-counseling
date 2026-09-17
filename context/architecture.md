# Architecture

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16.2.10 App Router | Routes, layouts, Server Components, and route handlers |
| Language | TypeScript 5.x in strict mode | Typed application and Prismic integration |
| Runtime UI | React 19.2.4 | Component rendering and client interactivity |
| Styling | Tailwind CSS 4.x | Utility styling through `src/app/globals.css` |
| Content | Prismic CMS | Page content and content models |
| Content SDK | `@prismicio/client` 7.x | Repository queries and route resolution |
| Rendering | `@prismicio/react` and `@prismicio/next` | Slice rendering, previews, and Next.js integration |
| Modeling | Slice Machine 2.x | Custom types, slices, simulator, and model synchronization |

Use `package.json` as the exact dependency-version source of truth.

## Folder Structure

```text
/
├── AGENTS.md
├── context/                       # Project and agent guidance
├── customtypes/
│   └── home/index.json            # Slice Machine-managed Home model
├── public/                        # Static assets
├── src/
│   ├── app/
│   │   ├── api/preview/           # Enable Prismic previews
│   │   ├── api/exit-preview/      # Exit preview mode
│   │   ├── api/revalidate/        # Prismic revalidation endpoint
│   │   ├── components/             # Shared layout, typography, links, site shell, Rich Text, and media primitives
│   │   ├── slice-simulator/       # Slice Machine simulator route
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── slices/
│   │   ├── Hero/                  # Homepage, full-image homepage, and inner-page hero renderer/model
│   │   ├── AudienceAccordion/     # Hash-aware Parents, Teens, and Adults accordion
│   │   ├── WhoIWorkWith/          # Homepage audience overview rows
│   │   ├── HeadingAndText/        # Side-by-side, two-column, and conversation editorial layouts
│   │   ├── ImageAndText/          # Reusable image/copy split with optional surface and divider controls
│   │   ├── InformationGrid/       # Repeatable two-column practical-information grid
│   │   ├── LocationMap/           # Address-driven map and editorial location copy
│   │   ├── FaqAccordion/          # Repeatable native-disclosure FAQ rows
│   │   ├── CallToAction/          # Conversation CTA with shared button and helper copy
│   │   ├── Content/               # Text Only, Centered Text, Image Right, and Image Left renderer/model
│   │   ├── Image/                 # Full Width and Two Up image renderer/model
│   │   ├── Video/                 # YouTube, uploaded, and external video renderer/model
│   │   └── index.ts               # Generated slice component registry
│   └── prismicio.ts               # Central Prismic client and route resolver
├── prismicio-types.d.ts            # Generated Prismic types
└── slicemachine.config.json        # Slice Machine repository configuration
```

## System Boundaries

| Area | Responsibility |
| --- | --- |
| `src/app` | Next.js routes, layouts, server rendering, and route handlers |
| `src/app/components` | Shared presentation primitives, including the single Prismic Rich Text renderer |
| `src/prismicio.ts` | Repository name, route resolver, query client, and preview wiring |
| `src/slices` | React components for Prismic shared slices and the generated registry |
| `customtypes` | Slice Machine-managed custom type models |
| `prismicio-types.d.ts` | Generated TypeScript types for synchronized models |
| `context` | Accurate project guidance; no secrets or generated build output |

## Content Data Flow

```text
Prismic editor publishes content
  -> Prismic Content API
  -> createClient() in src/prismicio.ts
  -> Next.js Server Component query
  -> SliceZone with the generated slice component registry
  -> rendered route
```

The root layout separately queries the non-repeatable `settings` document and passes it to `SiteHeader` and `SiteFooter`. Those components render only CMS-provided words and destinations; they intentionally do not contain hard-coded content fallbacks. Desktop navigation remains in the server-rendered header, while `SiteMobileNavigation` owns the mobile-only hamburger, right-side drawer, focus trap, Escape handling, body scroll lock, and close-on-navigation behavior.

Page routes pass their UID through `SliceZone` context. Hero uses that route context only to select prototype-specific presentation hooks (title measure and media crop); copy and destinations remain Prismic-owned.

## Preview Flow

```text
Prismic preview request
  -> /api/preview
  -> Next.js draft mode
  -> enableAutoPreviews() on the centralized client
  -> unpublished content rendered through normal route components
```

`/api/exit-preview` disables preview mode. `/api/revalidate` supports Prismic-triggered cache refreshes.

## Content Modeling Flow

```text
npm run slicemachine
  -> edit or create custom types and slices
  -> Slice Machine synchronizes model JSON
  -> generated Prismic types and slice registry update
  -> application implements or updates slice components
```

Never bypass Slice Machine by directly editing model JSON.

## Rich Text Rendering

All Prismic Rich Text fields render through `src/app/components/PrismicRichText.tsx`. It is the one place that maps Prismic node types to the project's typography, list, code, and inline-link styles.

- Body content begins at H2; H1 is deliberately suppressed in the renderer and must remain disabled in Rich Text field models.
- Inline hyperlinks use `PrismicLink`. Dedicated CTA fields use `ButtonLink`.
- Rich Text image and embed nodes intentionally render nothing. Dedicated Image and Video slices own media layout, while `LazyYouTubePlayer`, `LazyVideo`, and `LazyTikTokPlayer` provide shared lazy-loading primitives.
- `LazyYouTubePlayer` uses the browser's native iframe lazy loading, while `LazyVideo` renders a poster-capable HTML video player with metadata-only preload.
- A slice may provide a rare local component-map override, but it must not replace the shared renderer.

## Environment

The default repository is committed in `slicemachine.config.json`. Public content queries do not currently require a secret.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | Optional | Override the default Prismic environment/repository at runtime |
| `RESEND_API_KEY` | Required for delivery | Server-only Resend credential for consultation email delivery |
| `CONSULTATION_TO_EMAIL` | Required for delivery | Server-only destination for consultation requests |

The consultation route validates every unknown request body with the shared Zod schema before consulting delivery configuration. Until the Resend email template and receiving policy are completed, it returns an explicit service-unavailable response and never reports a false success. Keep both Resend values server-only. If private Prismic access is later enabled, keep access tokens server-only and document the new environment variable here.

## Invariants

1. The repository name remains `mental-health-counseling` unless Gladys's site is intentionally reconnected to another Prismic repository.
2. Prismic clients are created through `src/prismicio.ts`.
3. Route resolver entries match real Prismic types and Next.js routes.
4. Model JSON and generated types are changed through Slice Machine.
5. App routes default to Server Components.
6. No database, authentication system, or UI framework is assumed.
7. New architecture is documented when it is introduced, not before.
8. Global navigation and footer content come from the `settings` singleton; shared layout and appearance remain owned by the React components and `globals.css`.
