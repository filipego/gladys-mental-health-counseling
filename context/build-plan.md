# Build Plan

## Principle

Keep Gladys's counseling site focused and content-led. Add one complete, verifiable visitor workflow at a time, starting with the pages and consultation path defined in `planning/website-content.md`.

## Phase 1: Technical Foundation

**Status: complete**

- Next.js App Router, TypeScript, Tailwind CSS, and ESLint installed.
- Prismic and Slice Machine packages installed.
- Repository connected to `mental-health-counseling`.
- Existing `home` custom type synchronized.
- Preview, exit-preview, revalidation, and simulator routes generated.
- Lint, TypeScript, production build, application routes, and Slice Machine smoke-tested.
- Shared layout, typography, link, CTA, and Rich Text primitives established for the counseling site.

## Phase 2: First Prismic-Rendered Page

**Status: complete**

1. [x] Resolve the local Hero slice referenced by the Home model.
2. [x] Add `{ type: "home", path: "/" }` and `{ type: "page", path: "/:uid" }` to the route resolver.
3. [x] Replace the default Next.js page with a server-rendered Home document query.
4. [x] Render Home and repeatable Page slice zones through `SliceZone` and the generated component registry.
5. [x] Apply Prismic SEO metadata to both route types.
6. [x] Generate static parameters for published repeatable Page UIDs.

## Phase 3: Gladys Website Build

Use the content plan in `planning/website-content.md` as the working product brief. Keep unconfirmed credentials, fees, availability, privacy procedures, and telehealth details clearly marked until Gladys confirms them.

1. [In progress] Model the four required pages and only the slices needed for their content. The global `settings` type and shared site shell are complete and pushed; page content slices remain.
2. Add the planned Home, About Gladys, Therapy & Support, and Get Started content in Prismic.
3. Implement slices with accessible, responsive React components.
   - Use `Bounded`, `Heading`, `PrismicRichText`, and `ButtonLink` where their roles apply.
4. Add the consultation request workflow only after the receiving service, privacy handling, and fallback contact route are confirmed.
5. The prototype-derived shared visual foundation and global header/footer are implemented in `context/design-system.md`; continue with page slices and imagery in prototype order.
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
