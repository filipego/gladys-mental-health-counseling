# Code Standards

## Engineering

- Inspect the context and nearby source before editing.
- Keep each change focused, complete, and verifiable.
- Prefer simple, readable code over speculative abstractions.
- Avoid unrelated renames, moves, formatting churn, and broad refactors.
- Do not invent product behavior, data systems, or UI architecture that has not been requested.
- Keep new files focused and reasonably small.

## TypeScript

- Keep strict TypeScript enabled.
- Do not use `any`; prefer `unknown` and narrow it.
- Use generated Prismic document and slice types.
- Keep server-only values out of Client Components.
- Use `const` by default and handle asynchronous failures.
- Use the `@/*` alias for imports under `src/*`.

## Next.js 16

- Use App Router conventions under `src/app`.
- Default to Server Components.
- Add `"use client"` only for client state, effects, event handlers, browser APIs, or client-only libraries.
- Read relevant bundled guidance under `node_modules/next/dist/docs/` before using unfamiliar or fast-moving APIs.
- Use asynchronous request APIs where required by Next.js 16.
- Keep route handlers focused on one responsibility.
- Use `notFound()` or an intentional fallback when requested Prismic documents are absent.

## Prismic

- Import `createClient` from `@/prismicio` for queries.
- Keep route resolution centralized in `src/prismicio.ts`.
- Use Slice Machine for model changes.
- Do not edit `customtypes/**/*.json`, slice model JSON, `prismicio-types.d.ts`, or `src/slices/index.ts` by hand.
- Implement generated slice React components with typed props.
- Use `SliceZone` and the generated `components` registry to render slice zones.
- Handle Prismic API failures and missing content deliberately; do not silently render misleading content.
- Keep preview and revalidation routes server-only.
- Render Rich Text with `@/app/components/PrismicRichText`; do not add a second serializer inside a slice.
- Rich Text body fields start at H2. Keep H1, images, and embeds disabled in the Prismic field model.

## Styling and Components

- Tailwind CSS and `src/app/globals.css` are the only established styling system.
- Match nearby patterns before introducing abstractions.
- Do not assume shadcn/ui, Radix, a shared component folder, a token system, or an icon library exists.
- Add a component library only after a concrete requirement establishes why it is needed.
- Preserve responsive behavior and accessible HTML.
- Use `PrismicLink` for inline editorial links and `ButtonLink` only for intentional CTA link fields.
- Use the lazy provider components for YouTube and TikTok. Keep their provider-specific embed URLs and autoplay behavior inside those components rather than duplicating them in slices.
- Keep semantic colors and shared utility tokens in `src/app/globals.css`; components should consume those names rather than project-specific color values.

## Dependencies

- Prefer installed packages and platform APIs.
- Check `package.json` and official documentation before changing a fast-moving integration.
- Do not add packages speculatively.
- Update `context/library-docs.md` when a dependency creates a project-wide usage rule.

## Generated and Protected Files

Do not directly modify:

- `.next/`
- `node_modules/`
- `prismicio-types.d.ts`
- `src/slices/index.ts`
- Prismic model JSON under `customtypes/` or slice model folders

## Verification

For application or integration changes, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

When Prismic or preview behavior changes, also smoke-test the affected application route and Slice Machine or preview route as appropriate.
