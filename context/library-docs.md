# Library Guidance

Check `package.json` for exact installed versions. Use official documentation for fast-moving APIs.

## Next.js and React

- Next.js 16.2.10 with the App Router.
- React and React DOM 19.2.4.
- Default to Server Components.
- Keep routes, layouts, metadata, and route handlers under `src/app`.
- Read relevant documentation under `node_modules/next/dist/docs/` before writing Next.js-specific code that may have changed.

## Prismic Client

- `@prismicio/client` performs Content API queries and route resolution.
- Use the centralized `createClient()` wrapper from `src/prismicio.ts`.
- Use generated types from `prismicio-types.d.ts` rather than duplicating document interfaces.

## Prismic React and Next.js

- `@prismicio/react` provides `SliceZone` and Prismic rendering helpers.
- `@prismicio/next` provides Next.js preview integration, slice simulation helpers, and Next-aware components.
- `enableAutoPreviews()` is already configured in the centralized client.
- Use the local `PrismicRichText` wrapper for all Rich Text fields. It centralizes the `components` map instead of relying on Prismic's unstyled defaults.
- `PrismicLink` is the shared Next-aware inline-link primitive. `ButtonLink` builds on it for CTA presentation.
- The site deliberately supports typography, lists, code blocks, and inline links in Rich Text only. It suppresses H1, image, and embed nodes; media uses dedicated components.
- `LazyYouTubePlayer` is a Client Component for dedicated YouTube ID fields. It uses a native lazy-loading iframe, includes an accessible title, and owns provider-specific URL parameters. `LazyVideo` renders uploaded and external MP4 sources with controls, a Prismic poster image, and metadata-only preload.

## Slice Machine

- `slice-machine-ui` provides the local modeling interface.
- `@slicemachine/adapter-next` generates and maintains the Next.js integration.
- Run it with `npm run slicemachine`.
- Treat model JSON, generated types, and the slice registry as generated output.

## Tailwind CSS

- Tailwind CSS 4 is configured through `@import "tailwindcss"` in `src/app/globals.css`.
- Gladys's prototype-derived semantic colors, card radii, 1200px page width, and shared site-shell styles live in `src/app/globals.css`. Read `context/design-system.md` for roles and component usage.
- Inter is loaded with `next/font/local` from the prototype's exact local font file and served by Next.js. Body text uses Regular and prototype headings/buttons use Medium.
- Keep styling simple and local until reusable patterns emerge.

## ESLint and TypeScript

- ESLint uses `eslint-config-next` through `eslint.config.mjs`.
- TypeScript runs in strict mode.
- `tsx` runs the site's Node test suite through `npm test`.

## Dependency Policy

The approved baseline is the dependency set in `package.json`. Add another library only for a concrete project requirement, and document any project-wide rule it introduces.
