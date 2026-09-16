# Proposed website direction

Status: shared style foundation implemented, September 8, 2026. The user selected the ElevenLabs basis and supplied its Refero style export. The implementation specification is in `context/design-system.md`. The earlier study below remains reference rationale; the current specification supersedes its provisional color and font choices. Page composition and imagery are still pending.

## Brief and hard boundaries

Create a clear, welcoming counseling website for Gladys Henriquez, with parents as the primary audience while retaining clear routes for teens and adults. Keep the planned Home, About Gladys, Therapy & Support, and Get Started structure. The name serves as the wordmark; this is not a rebrand.

No green, including sage, mint, olive, or green-tinted neutrals. No eyebrow text above headings. No speculative testimonials, outcome statistics, stock therapist scenes, generic gradient spheres, or repeated icon-card grids. Avoid clinical software and luxury-spa associations.

## Evidence reviewed

Reviewed the live homepages in the Codex in-app browser, alongside saved-reference notes and screenshot review. The Design Taste Hub project is `5961fbf9-3ee1-43d6-b4bb-4a91aab4d8a1`, named `Gladys’s  Mental health counseling`.

| Reference | Saved ID | Useful evidence | Boundary |
| --- | --- | --- | --- |
| [ElevenLabs](https://elevenlabs.io/) | User-provided URL | Near-white and warm gray surfaces, restrained sans-serif headings, split opening text, wide rounded visual panel | Primary reference for composition and typography, not SaaS widgets or voice spheres |
| [Awesomic](https://www.awesomic.com/) | 02e244f9-260f-4099-884d-d9b9864f1594 | Selected rounded shapes and section details | User explicitly dislikes the overall layout; do not adopt it |
| [August Health](https://www.augusthealth.com/) | b88a6a9b-a0af-477b-b2e1-eeccb2d0af4d | People incorporated into large compositions | Partial inspiration only; colorful circular framing and crowded edges are not recommended |
| [Augen](https://augen.pro/) | abcfa648-6c8b-4533-b225-b099c1c7e4fa | Typographic restraint and one dominant focal image | Futuristic anonymous head and minimal service explanation are inappropriate as the site's main language |
| [Ease Health](https://easehealth.com/) | 4e214a53-ddb2-4e73-8786-3301a12c0276 | Rounded horizontal feature sections and clear text/image grouping | Do not inherit green, dashboard imagery, eyebrow labels, or whole-page card treatment |
| [Seed](https://seed.com/) | dd285ded-2ac5-4c11-9e67-50bce448c53f | Large explanatory artwork beside concise text, especially the saved translucent-head section | Borrow visual scale, not green, supplement marketing, or anatomical/biotech symbolism |

The Hub returned all five references through project search, but individual get_reference calls reported that each was no longer in the library. Search metadata and saved screenshots remained available. Treat this as a retrieval inconsistency; no library records were changed. No full motion/video audit or mobile audit was performed.

## Recommended palette

These are proposed roles, not extracted tokens except where explicitly noted.

| Role | Color | Use |
| --- | --- | --- |
| Paper | #FDFCFC | Main background; observed on ElevenLabs |
| Soft stone | #F5F3F1 | Occasional section surfaces; observed on ElevenLabs |
| Warm charcoal | #292524 | Headings, body, primary buttons |
| Muted rose | #E8D9D5 | A limited human-facing panel or artwork background |
| Deep wine | #69434B | Links and small emphasis; optional alternate CTA color |
| Fine border | #DED8D4 | Quiet separators, form edges where sufficient contrast is established |

Keep roughly 85–90% of the page neutral. Rose is a supporting surface, not every section's background. Use dark text on pale surfaces; do not use pale accent colors for body text. Verify actual contrast and focus/error states when implementing. No green success states.

## Typography and shape

Use clean sans-serif typography with a lighter large heading and comfortable body text. ElevenLabs' inspected CSS declared Waldenburg for the sampled H1 and Inter for body copy. Its sampled desktop H1 was 48px, weight 300, line-height 52px, and letter-spacing -0.96px. These are observed reference values, not fixed responsive specifications or proof of font licensing.

Wait for the user's Refero Markdown exports before finalizing fonts, spacing, responsive scales, or density. Verify font licensing before adopting Waldenburg. Do not automatically add a serif or script font because the subject is therapy.

Use rounded corners on large media panels and selected functional controls, not on every piece of copy. Maintain readable text widths and strong text contrast. The name wordmark should be quiet and legible.

## Homepage composition

1. Simple navigation and name wordmark. Four page links and one consultation action.
2. Split opening composition: a direct headline on the left; concise audience/location/language explanation and consultation CTA on the right. No eyebrow. Stack headline, explanation, and action in that order on mobile.
3. One wide, shallow visual panel beneath the opening, taking its scale from ElevenLabs and Seed. Explore warm-toned, softly lit folded or translucent material with a single intersecting line motif. This is a concept to test, not an approved asset. Avoid a literal brain, anonymous AI face, generic floating blobs, or an oversized artwork that pushes service clarity offscreen.
4. Parent-recognition copy in an open section, followed by a more prominent parent-support block and quieter teen/adult links. Do not force three equal cards when the audiences have different priority.
5. Introduce Gladys early enough to build trust on Home, then give her portrait and approach more room on About. Do not reserve her only photograph for an FAQ section. No substitute portrait is authorized.
6. Explain what starting looks like, then answer the practical questions about fees, location, availability, and consultation. End with a straightforward invitation and a clear route to the form.

Use an intentional alternation of open text, one visual panel, portrait-led content, and practical information. Avoid long sequences of identical boxes or excessive blank scrolling. Keep motion optional and restrained; core copy must remain visible without animations.

## Why this direction

ElevenLabs is the user's strongest whole-page preference. Use it as the foundation rather than averaging five partial references into a collage. Warmth should come from Gladys's real presence, clear personal writing, soft light, and a restrained rose accent. The conversion hypothesis is that visitors can identify who Gladys helps, understand the first step, and find practical information without navigating decorative obstacles. This is a design judgment, not a tested conversion claim.

## Next decision

Ask the user to approve or adjust this direction. Then request the ElevenLabs Refero Markdown export first, with Seed's specific artwork section and Ease's selected section as optional secondary inputs. Reconcile them into one system instead of copying incompatible tokens. Gladys's photo and font licensing remain pending. Prototype and global CSS work begin only after this review stage.
