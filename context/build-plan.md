# Build Plan

## Principle

Keep this a small, reusable Next.js and Prismic foundation. Add product behavior one complete, verifiable workflow at a time.

## Phase 1: Starter Foundation

**Status: complete**

- Next.js App Router, TypeScript, Tailwind CSS, and ESLint installed.
- Prismic and Slice Machine packages installed.
- Repository connected to `mental-health-counseling`.
- Existing `home` custom type synchronized.
- Preview, exit-preview, revalidation, and simulator routes generated.
- Lint, TypeScript, production build, application routes, and Slice Machine smoke-tested.
- Shared layout, typography, link, CTA, and Rich Text primitives established for future slices.

## Phase 2: First Prismic-Rendered Page

**Status: complete**

1. [x] Resolve the local Hero slice referenced by the Home model.
2. [x] Add `{ type: "home", path: "/" }` and `{ type: "page", path: "/:uid" }` to the route resolver.
3. [x] Replace the default Next.js page with a server-rendered Home document query.
4. [x] Render Home and repeatable Page slice zones through `SliceZone` and the generated component registry.
5. [x] Apply Prismic SEO metadata to both route types.
6. [x] Generate static parameters for published repeatable Page UIDs.

## Phase 3: Project Specialization

Use this phase only after a real client project defines its requirements.

1. Document the product, audience, routes, and content structure in `project-overview.md`.
2. Model only the required page types and slices in Slice Machine.
3. Implement slices with accessible, responsive React components.
   - Use `Bounded`, `Heading`, `PrismicRichText`, and `ButtonLink` where their roles apply.
4. Add dependencies or services only when a concrete feature needs them.
5. Update architecture and library guidance when the system changes.
6. Track delivered work and next steps in `progress-tracker.md`.

## Feature Checklist

- [ ] Route and content-model changes are intentional.
- [ ] Prismic model changes were made through Slice Machine.
- [ ] Generated types and slice registry are current.
- [ ] Queries use the centralized Prismic client.
- [ ] Loading, missing-content, preview, and error behavior are intentional.
- [ ] UI is responsive and accessible.
- [ ] Relevant context files are accurate.
- [ ] Lint, TypeScript, build, and focused smoke tests have been run.
