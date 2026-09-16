---
name: Gladys Henriquez desktop page demos
description: About-page compositions within the existing Home v4 visual system.
colors:
  paper: "#FDFCFC"
  stone: "#FFF4F7"
  line: "#EBE8E4"
  ink: "#000"
  body: "#44403B"
  muted: "#68625C"
  wine: "#69434B"
  onWine: "#F2E7E8"
  field: "#17130F"
  onField: "#E9E2DA"
  onFieldQuiet: "#AEA398"
  onBandStatement: "#E9C7CE"   # statement on either tonal band
  linkLine: "#DDD8D2"
  scrollbarThumb: "#D3CCC4"
  switcherShadow: "rgba(23,19,15,.3)"
typography:
  family: "Inter, sans-serif"
  displayWeight: 540
  tracking: "-0.04em"
  ramp:
    caption: "12px"
    meta: "13px"
    credential: "15px"
    control: "15px"
    bodyNarrow: "16px"
    body: "17px"
    bodyReading: "18px"
    lead: "clamp(20px, 1.75vw, 25px)"
    leadReading: "clamp(21px, 1.95vw, 27px)"
    statement: "clamp(24px, 2.3vw, 32px)"
    heading: "clamp(26px, 3.1vw, 45px)"
    titlePortrait: "clamp(39px, 4.4vw, 63px)"
    title: "clamp(46px, 6.6vw, 96px)"
measure:
  body: "52ch"
  reading: "70ch"
  lead: "30ch"
rounded:
  portrait: "0"
leading:
  body: 1.62
  lead: 1.42
  statement: 1.32
  heading: 1.07
spacing:
  chapter: "clamp(96px, 15vw, 224px)"
  gutter: "clamp(40px, 5vw, 88px)"
  headingToBody: "clamp(40px, 5vw, 76px)"   # --heading-gap, shared by h1 and h2
  paragraph: "20px"
---

# Design System: Gladys Henriquez page demos

## Overview

A local description of the About composition and shared page system. `Home.html`, `refinements.css`, and `rebuild.css` remain the authority for shared identity, header, footer, palette, controls, and typography family. `about.css` defines the About composition, the About type ramp, and demo navigation sizing.

The selected direction is About v1 — Portrait. Home and Therapy use the same shared v4 identity system.

## Typography

Earlier studies had two registers: a 64–72px title above 15px body with nothing between, so every section read as a large heading above fine print. The ramp above fills that gap. Body copy is 17px, and two registers sit between body and heading: a `lead` that opens a page and a `statement` that lifts one sentence out of a reading column at display scale.

The page title now outweighs the footer signature. Section headings are large because their full-width position can support the size; when a heading sits beside a portrait it steps down to `headingAside`. Display type is capped at 96px and tracking never goes tighter than -0.04em.

Her credential is not repeated in the page body. It is stated in the footer and again in "My background", which is where the source document places the practice and language details.

## Colors

Paper is the canvas and ink carries headings and primary actions. Wine carries the `statement` register and the text-only approach band. Wine behind a photograph did not work: the plum fought the image and left it reading as a rectangle pasted onto the band. Photographs stay on stone or paper. Paper on wine measures 8.19:1, `onWine` body copy 6.93:1, and the statement 5.40:1. Wine remains the only accent hue.

## Layout

The shared container caps at 1200px with 48px desktop side margins.

**Every section heading sits on top at full width, with its copy beneath it.** A heading is never squeezed into a narrow column beside a deeper one: the short column always ran out first, which is what made the earlier studies feel unspaced. The only heading that sits beside something is the one paired with a portrait, and it owns its whole column.

**Every paragraph on the page is the same length.** The measure is deliberately set below the narrowest column any paragraph sits in, so it is the measure that governs the line length rather than whatever grid the paragraph happens to land in. Where a column would squeeze below it, the section stacks instead. Reading columns carry no measure of their own: a `ch` on a wrapper resolves against the inherited 16px rather than the paragraph's 17px, which silently clips the paragraph 32px early.

**The closing call to action lines up with the footer links.** Its column is the width of the footer's link column, a constant 320px, so the button and its helper start on the same line as "About Gladys" rather than hugging the right edge of the page.

**No section boundary is a rule.** Every boundary on these pages is a change of ground: paper, white-pink stone `#FFF4F7`, or on the Editorial option the dark field. The tint stays nearly white while remaining recognizably pink. There is no longer a single border anywhere on the page, including under the closing invitation.

**There is one section heading size.** A heading opening a chapter, a heading set beside a portrait and the closing heading are all doing the same job, so they are all `heading`. The page previously ran four sizes for that single role, 44, 56, 60 and 62px, which read as inconsistency rather than hierarchy.

**Every heading on the page, the title included, sits the same distance above its content.** That distance is a single variable, `--heading-gap`, used by both `h1` and `h2`, so the page title and the section headings cannot drift apart.

**The gap under a heading is about three and a half times the gap between two paragraphs.** 76px against 20px on a wide desktop. When those two numbers were 53 and 26, a heading looked attached to its first paragraph while the paragraphs beneath drifted apart from each other. Body leading is 1.62; the earlier 1.76 was loose enough that the paragraph breaks stopped registering as breaks.

**Rhythm is one number, and it is large.** Every section contributes half a chapter of padding on each side, so the distance between any two sections is identical whether the boundary is paper to paper or paper to a tonal band. That gap is 224px on a wide desktop and never drops below 96px; no breakpoint quietly reduces it. Bands carry no extra padding of their own. Space is what separates the sections here, which is why the page needs almost no rules.

**Nothing is bottom-aligned to a photograph.** The opening title starts at the top of the page and the portrait takes the height of its row rather than dictating it. Portraits set beside copy are capped near the height of that copy so they do not hang past the end of the text.

**Separation is space and surface, not rules.** There is exactly one rule on each page, above the closing invitation, and it runs the full width of the viewport rather than stopping at the content. Container-width rules, pull-quote rules, and underlines beneath standing text were removed.

**About v1 — Portrait** is the selected composition: introduction centred against a large standing portrait, a wine approach chapter, a stone context band, and a background chapter beside a second photograph. It ends with the shared consultation invitation and inherited footer. Reviewed at 1440, 900, and 390 px.

## Elevation & Depth

The content is flat. Tonal surfaces and photographic depth provide separation. The only shadow on the page belongs to the fixed review switcher, which is deliberately lifted off the content it can overlap.

## Shapes

Portraits are unrounded rectangles and stay inside the container; neither softened corners nor a bleeding edge suited this material.

## Motion

None. There is no entrance animation, no scroll-triggered reveal, and nothing sticky.

## Browser surfaces

Selection colour is inherited. The About pages additionally theme the scrollbar and the caret from the palette.

## Components

Header and footer use the same v4 classes and inherited rules as Home. Navigation targets connect the local demos. The consultation button points to the Get Started prototype; form and privacy destinations remain prototypes.

## Do's and Don'ts

- Do put every section heading on top at full width, at the one `heading` size.
- Do keep the section rhythm on the single `chapter` value.
- Do use the ramp above rather than introducing new literal sizes.
- Do retain the supplied content and factual qualifications.
- Don't add a rule that stops at the content width, and don't use rules where space or a surface change will do.
- Don't add entrance animation, scroll effects, or sticky elements.
- Don't restore rounded portraits, bleeding imagery, section numbering, or an eyebrow above a heading.
- Don't shrink the chapter gap to fit more on screen, and don't let a portrait push a heading down its column.
- Don't give a section heading its own size because of where it sits, and don't let the paragraph gap creep toward the heading gap.
- Don't reach for a border to separate two sections. Change the ground instead.
- Don't put a `ch` measure on a wrapper around body copy. Put it on the copy.
- Don't put a photograph on the wine band. Wine is for text-only chapters.
- Don't leave a paragraph ending on a stranded word. `text-wrap: pretty` handles most of it; the opening measures are set against the real line breaks of this copy.
- Don't add a second accent hue. The dark field is a surface.
- Don't infer that an option is selected, approved for production, or verified beyond the three widths listed above.
