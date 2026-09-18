# Website style foundation

## Source and scope

The approved pages in `prototypes/pages/` are the visual source of truth: Home, About Gladys, Therapy & Support, and Get Started. The production foundation reproduces their shared colors, Inter typography, 1200px page bounds, link/button language, sticky header, and footer. Page-specific composition remains the responsibility of future slices.

## Colors

`src/app/globals.css` owns these semantic colors and exposes them as Tailwind utilities.

| Token | Value | Role |
| --- | --- | --- |
| background / paper / inverse | #FDFCFC | Canvas and light text on dark surfaces |
| surface | #FFF4F7 | Blush sections, quiet panels, and footer |
| surface-strong / border | #EBE8E4 | Dividers and neutral hover surface |
| foreground / primary | #000000 | Main text and links |
| body / secondary | #44403B | Paragraph copy |
| muted-foreground | #68625C | Readable supporting copy |
| rose | #E8D9D5 | Text selection |
| wine | #6A2C47 | Primary CTA fill and link hover |
| wine-hover | #8A626A | Primary CTA hover/focus |
| wine-band | #6A2C47 | Alias of wine for deep page bands and form surfaces |
| on-wine | #F2E7E8 | Supporting copy on deep mauve |
| rose-border | #E8C8CF | Visible pale-rose outlines and footer divider |
| rose-accent | #E9C7CE | Accent copy on dark bands |
| field / on-field | #17130F / #E9E2DA | Optional darkest editorial band and its text |

No automatic dark inversion. Keep the exact semantic roles above instead of introducing near-duplicate color values inside slices. Form boundaries still require a direct contrast check.

The supplied reference's faint Ash and Smoke text colors were not copied for ordinary text. Supporting text uses a darker gray. Do not encode Tailwind numeric spacing overrides such as `--spacing-16: 16px`; that would change established `px-16`/`gap-16` semantics.

## Type

Inter is loaded through `next/font/local` from the exact `prototypes/pages/assets/inter.ttf` reference file. Body uses Regular; buttons and headings use Medium. Use `font-heading` and `font-sans`; do not scatter font-family declarations into slices.

| Heading size prop | Responsive size | Line height |
| --- | --- | --- | --- |
| xl | clamp(38px, 4.1vw, 54px) | 1.09 |
| lg | clamp(30px, 3vw, 38px) | 1.17 |
| md | clamp(26px, 3.1vw, 45px) | 1.07 |
| sm | clamp(22px, 2.2vw, 32px) | 1.1 |
| xs | clamp(18px, 1.55vw, 21px) | 1.2 |

Heading letter spacing is -0.035em (with -0.04em available for display signatures). Body defaults to 16px/1.6. The existing Rich Text renderer uses `Heading` and `PrismicLink`; do not invent another serializer. Semantic heading levels remain independent from display size.

## Buttons and links

`ButtonLink` is the existing CTA component. It still forwards Prismic link fields, hrefs and other supported link props; it is not a native form-submit button.

| Prop | Appearance |
| --- | --- |
| variant="primary" | Wine fill, paper text; lighter-wine hover |
| variant="secondary" | Eggshell fill, black text, stone border; stronger neutral hover |
| variant="outline" | Transparent fill, black text, stone border; taupe hover |
| size="sm" | Minimum 36px height, 16px horizontal padding, 14px text |
| size="md" | Minimum 44px height, 20px horizontal padding, 14px text; default |
| size="lg" | Minimum 52px height, 24px horizontal padding, 16px text |

All sizes use full pill corners, medium weight, vertical padding for wrapping, and the prototype arrow. `showArrow={false}` is available only where the design intentionally omits it. CTA labels have no underline; ordinary editorial links retain their underline.

`TextLink` is the shared standalone editorial-link component. It composes `PrismicLink` with the existing `ArrowIcon`, uses the prototype's fine underline, and exposes only `dark` and `light` tones so the same link works on paper and wine surfaces. Do not reproduce this arrow-link markup inside slices.

`Button` is the action counterpart to `ButtonLink`. It shares the same pill geometry, sizes, focus treatment, and semantic variants, adding an inverse paper-on-wine treatment for form submission. Navigation stays in `ButtonLink`; submit/reset actions use `Button`.

## Consultation form

The Get Started form owns a full-width `wine-band` surface and the standard 1200px `Bounded` rail. Desktop fields use the prototype's two-column grid, 44px title-to-grid separation, 88px row gap, pale-rose underlines, and pill radio controls; the layout collapses to one column at 1100px and tightens its section rhythm at 760px. `Heading`, `Button`, and `TextLink` remain shared primitives. `FormField`, `FormTextarea`, `ChoicePills`, and `LoadingDots` are reusable form controls rather than inline slice markup. The animated three-dot state respects reduced-motion preferences.

## Surfaces and spacing

Use `bg-surface rounded-card` for a 20px-radius warm-gray panel. Use `rounded-large` for 24px large media panels. Flat surfaces are the default; no heavy shadows or speculative Card abstraction.

Every slice uses `Bounded`. Standard content uses `max-w-page` (1200px), 20px mobile gutters and 48px gutters from tablet widths, with 52px/80px standard vertical padding. Compact and no-spacing options remain available; narrow/full widths remain intact.

## Global shell

`SiteHeader` and `SiteFooter` are rendered by the root layout around every page. Both use the reusable traced `LovelyDaysLogo` alongside Settings-owned navigation and content. The logo module exposes small, medium, large, and fluid display sizes; the header uses the readable medium treatment at 80% ink opacity while the footer uses the softer display treatment. They step down to dedicated 126px and 280px maximum widths on mobile. At 760px and below, desktop links give way to a two-line hamburger that opens a blush, right-side drawer with a backdrop, focus containment, Escape-to-close, body scroll lock, and close-on-link navigation. The footer uses the blush surface, 320px navigation rail, oversized signature, practice details, emergency copy, copyright, and Privacy link.

The footer navigation compares each CMS-managed destination with the current pathname and omits the matching item. Home therefore excludes Home, About excludes About Gladys, Therapy & Support excludes Therapy & Support, and Get Started excludes Get Started.

The non-repeatable Prismic `settings` document owns all header and footer words and destinations. The shared components do not contain copy or route fallbacks; empty CMS fields render empty rather than hiding an incomplete Settings document. Do not repeat header/footer markup or fields inside page slices.

## Hero typography and model ownership

Never render eyebrow labels above headings. Hero no longer contains eyebrow fields; Content retains its legacy fields but does not render them. Hero page titles are plain-text H1 elements. Hero lead, supporting, and helper copy are Rich Text fields rendered through the shared `PrismicRichText` component and styled by the global `.hero__lead`, `.hero__supporting`, `.hero__helper`, and `.prismic-rich-text` rules. Do not add per-slice inline Rich Text serializers.

Homepage Hero uses the prototype's content-and-artwork split, with a dedicated animation-poster field for the future animation surface. Inner Page Hero uses the shared copy-and-portrait split for About, Therapy & Support, and Get Started.

Both variations use the prototype's 1200px rail, `minmax(0, 1fr) clamp(320px, 35vw, 520px)` desktop columns, `clamp(40px, 5vw, 88px)` gap, and `clamp(48px, 7.5vw, 112px)` vertical padding. Hero titles use `clamp(31px, 3.5vw, 50px)` at 1.01 line height; lead and supporting paragraphs own their 42ch and 52ch measures so the Rich Text wrapper never shortens them. Portrait and animation-poster surfaces use `clamp(520px, 50vw, 700px)` with cover cropping. Route context adds only the page-specific title measure and prototype crop: About 50% 28%, Therapy and Get Started 48% 62%.

The Homepage Hero CTA remains the shared `ButtonLink`: the first CTA receives the prototype solid treatment and later CTAs receive the prototype text-link treatment. Every Hero title remains the shared `Heading`. No Hero contains a private button, heading, Rich Text serializer, or duplicated page copy.

## Image and Text slice

ImageAndText is one reusable image/copy split rather than content-specific Home or About slices. It has one variation and independent Prismic Boolean controls for the wine background, top border, and bottom border. All controls are optional and composable.

The slice uses the 1200px `Bounded` rail, the prototype's `clamp(48px, 7.5vw, 112px)` chapter padding, balanced desktop columns, shared `Heading` H2, shared `PrismicRichText`, and shared `TextLink`. When the background is enabled, the portrait bleeds through the section's vertical padding and all copy switches to the approved paper/on-wine tokens. Without the background, the portrait and copy retain the paper surface and optional full-width divider. Mobile stacking and crop changes are owned by the global `.image-and-text` rules; no page copy or inline presentation lives in the renderer.

## Information grid and call to action slices

`InformationGrid` is the reusable pink practical-information section. It uses the surface token, 1200px `Bounded` rail, shared `Heading` hierarchy, a repeatable two-column definition grid on desktop, and one-column stacking on mobile. Item bodies are rendered by the shared `PrismicRichText`, including the Get Started location anchor. Page context is used only for the prototype's larger mobile item rhythm on Get Started.

`CallToAction` is the reusable paper conversation section. It preserves the prototype's desktop copy/action split and mobile stack, uses the shared `Heading` and `PrismicRichText`, and delegates the wine CTA entirely to `ButtonLink`. Its helper copy is a separate Rich Text field. Neither renderer contains page-specific words, destinations, or inline presentation.

## Heading and Text slice

`HeadingAndText` owns three editorial compositions: Side by Side, Two Columns, and Conversation Chapter. Each variation exposes the same optional wine-background control. The paper treatment preserves the existing foreground/body/link colors; the wine treatment removes the bottom rule, uses paper for headings, `on-wine` for ordinary copy, `rose-accent` for the Conversation Chapter statement, and the shared light `TextLink` treatment.

Conversation Chapter matches the selected About prototype: one full-width H2 followed by a `1.35fr / 1fr` reading-and-statement grid, with the statement at `clamp(24px, 2.3vw, 32px)`. The grid collapses at 1280px and keeps the standard Bounded rail and chapter spacing. The renderer continues to compose the shared `Bounded`, `Heading`, `PrismicRichText`, and `TextLink` primitives; no copy or presentation is inlined.

## Audience accordion slice

`AudienceAccordion` is the Therapy page's full-width wine chapter for Parents, Teens, and Adults. Each closed row uses a restrained number, audience label, and aligned summary; the open panel pairs a shared H2/Rich Text/TextLink reading column with a fixed-height editorial image. Full-viewport divider rules continue through the `Bounded` rail, while the content itself remains on the standard 1200px grid.

Exactly one audience may be open at a time, with Parents open initially unless a matching URL hash selects another row. Clicking the open row may close all panels. Hash links open and pin the matching row without smooth scrolling, and the arrow keys move focus cyclically between toggles. At 900px and below the row summary and open panel stack into the prototype's mobile reading order; reduced-motion preferences remove the panel animation.

## Client sheet and verification

The earlier client sheet remains in `output/pdf/Gladys Henriquez - Website Style.pdf`, but the four approved page prototypes now override that earlier reference wherever they differ. Current verification must use the real Next.js routes and the pushed Settings model, not the PDF alone.
