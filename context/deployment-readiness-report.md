# Deployment Readiness

## Current Status

The starter builds successfully and is suitable as a development foundation. It is not yet a finished Prismic website because the homepage still renders the default Next.js content.

## Configuration

| Setting | Required | Purpose |
| --- | --- | --- |
| Repository name in `slicemachine.config.json` | Yes | Connects the application to `mental-health-counseling` |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | Optional | Overrides the default Prismic environment/repository |

No database or Supabase environment variables are used.

## Before a Project Deployment

- [ ] Confirm the deployment should use `mental-health-counseling` or intentionally reconnect it.
- [ ] Confirm all deployed Prismic page types and slices are synchronized.
- [ ] Confirm the route resolver matches the deployed routes.
- [ ] Confirm the required Prismic documents are published.
- [ ] Verify missing-content behavior.
- [ ] Verify preview and exit-preview flows.
- [ ] Configure Prismic revalidation/webhooks if the project relies on immediate cache refreshes.
- [ ] Run local verification commands.
- [ ] Smoke-test deployed routes and review deployment logs.

## Local Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

For content or preview changes, also run both development processes:

```bash
npm run dev
npm run slicemachine
```

Then verify the application route, `/slice-simulator`, and relevant preview or revalidation behavior.

## Known Baseline Notes

- ESLint exits successfully with the generated Hero, Image, and Video slice registry in place.
- npm reports moderate transitive PostCSS advisories through Next.js with no stable fix currently available in the installed dependency line.
- No automated test suite is configured.

## Decision Template

```text
Decision: Ready / Not Ready
Date:
Target:
Blocking issues:
Non-blocking issues:
Verified by:
```
