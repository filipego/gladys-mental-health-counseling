# Next.js and Prismic Setup Design

## Goal

Create a current Next.js application in the repository root using TypeScript and Tailwind CSS, then connect it to the existing Prismic repository `mental-health-counseling`.

## Architecture

- Use the latest stable `create-next-app` scaffold with npm, the App Router, TypeScript, Tailwind CSS, ESLint, a `src/` directory, and the default `@/*` import alias.
- Use Prismic's current official Slice Machine initializer for Next.js rather than the obsolete `prismic init` command shown in the onboarding screenshot.
- Configure the generated Prismic client, Slice Machine adapter, slice simulator, and repository identifier for `mental-health-counseling`.
- Do not create speculative page types, slices, or application features.

## Data Flow

The generated Prismic client will use the repository endpoint derived from `mental-health-counseling`. Next.js server components can use that client to query published content. Slice Machine will manage local models and synchronize them with the same Prismic repository after authentication.

## Error Handling

- Surface Prismic authentication or repository-access failures without substituting a different account or repository.
- Keep generated configuration intact unless a compatibility issue requires a targeted correction.

## Verification

- Confirm the configured Prismic repository name is `mental-health-counseling`.
- Confirm the expected Prismic and Slice Machine packages are installed.
- Run linting, TypeScript checking, and a production build.
- Run a local smoke test if the scaffold and integration complete successfully.
