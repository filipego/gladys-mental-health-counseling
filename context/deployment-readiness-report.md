# Deployment Readiness

## Current Status

The Gladys Henriquez site is a development foundation with its page structure and content plan documented. It is not yet ready for deployment: the final visual direction and Prismic content are still pending, and the current production build has a remote Prismic link-resolver error for the `home` and `page` types.

## Configuration

| Setting | Required | Purpose |
| --- | --- | --- |
| Repository name in `slicemachine.config.json` | Yes | Connects the application to `mental-health-counseling` |
| `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` | Optional | Overrides the default Prismic environment/repository |

No database or Supabase environment variables are used.

## Before a Project Deployment

- [x] Confirm the deployment should use the `mental-health-counseling` repository.
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
