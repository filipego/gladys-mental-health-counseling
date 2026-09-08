<!-- BEGIN:nextjs-agent-rules -->

# This Is Not the Next.js You Know

This project uses Next.js 16. APIs and conventions may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js-specific code, and heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Prismic Starter Instructions

This repository is a minimal Next.js and Prismic starter. Do not assume it contains authentication, a database, an admin dashboard, a component library, or application-specific business logic.

## Read Before Implementing

Read these files in order before making architectural or product decisions:

1. `context/project-overview.md`
2. `context/architecture.md`
3. `context/prismic.md`
4. `context/code-standards.md`
5. `context/library-docs.md`
6. `context/build-plan.md`
7. `context/progress-tracker.md`

Read `context/deployment-readiness-report.md` before deployment work.

## Sources of Truth

- `package.json` defines the installed stack and scripts.
- `slicemachine.config.json` defines the Prismic repository, adapter, slice libraries, and simulator URL.
- `src/prismicio.ts` defines the Prismic client and route resolver.
- `src/app/components/` contains the shared layout, heading, link, button, and Rich Text primitives.
- `src/slices/` contains the local Slice Machine models and React renderers for Hero, Image, and Video.
- `customtypes/` contains models synchronized by Slice Machine. Do not hand-edit model JSON.
- `prismicio-types.d.ts` and `src/slices/index.ts` are generated. Do not hand-edit them.
- `src/app/globals.css` is the current styling source of truth.

## Rules That Never Change

- Keep the starter focused on Next.js and Prismic unless a task explicitly adds another system.
- Do not add Supabase, another database, authentication, storage, or a UI library speculatively.
- Use App Router conventions and default to Server Components.
- Create Prismic clients through `createClient()` from `src/prismicio.ts`; do not create scattered clients.
- Keep the route resolver aligned with actual page routes and Prismic custom types.
- Use Slice Machine for content-model and slice-model changes. Never directly edit JSON under `customtypes/` or model JSON under slice folders.
- Treat local Slice Machine at `http://localhost:9999` as the modeling source of truth. Do not mix cloud Type Builder edits or “Pull to local” with pending local model work.
- Preserve preview, exit-preview, revalidation, and slice-simulator routes unless a task intentionally replaces them.
- Render Prismic Rich Text through `PrismicRichText` from `@/app/components/PrismicRichText`; do not create per-slice Rich Text serializers.
- Rich Text body content starts at H2. Keep H1 disabled in Rich Text field models and render page titles outside Rich Text.
- Do not enable Rich Text images or embeds. Use dedicated project media components when those are introduced.
- Use `LazyYouTubePlayer` and `LazyTikTokPlayer` for their respective dedicated video fields. Do not paste provider iframe markup into slices.
- Do not modify generated artifacts such as `.next` or `node_modules`.
- Update the relevant context file when architecture, Prismic workflow, dependencies, or project scope changes.

## Development Workflow

1. Inspect the relevant context and nearby source files.
2. Make the smallest complete change.
3. If content models change, use `npm run slicemachine` and let Prismic generate or synchronize model files and types.
4. Verify with the narrowest relevant check.
5. Before completion, run `npm run lint`, `npx tsc --noEmit`, and `npm run build` when the change can affect the application build.
6. Record meaningful implementation progress in `context/progress-tracker.md`.
