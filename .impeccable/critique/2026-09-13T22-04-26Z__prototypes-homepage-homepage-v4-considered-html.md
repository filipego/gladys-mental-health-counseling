---
target: V4 audience and sessions background flow
total_score: 16
max_score: 20
na_heuristics: 1,5,7,9,10
p0_count: 0
p1_count: 0
timestamp: 2026-09-13T22-04-26Z
slug: prototypes-homepage-homepage-v4-considered-html
---
# V4 background-flow review

Method: dual-agent (A: background_design_review; B: background_evidence_review).

## Recommendation
Use the existing stone color as a full-bleed background for Who I work with. Remove the inset stone background and rounded container from Sessions and getting started. Keep hero, copy, imagery, numbered section headings and footer unchanged.

The resulting rhythm is stone introduction, paper parents, stone audiences, paper sessions, stone footer.

## Strengths
The audience rows use useful imagery and clear title/image/copy alignment. Consultation actions are easy to identify.

## Priority issues
1. P2: Parents and audiences share an extended undifferentiated paper surface. A full-bleed audience band would group the three audiences without borders or cards. Preserve the content rails. Use 72px band padding desktop and 48px mobile, redistributing current spacing rather than adding it to the existing 144px desktop gap.
2. P2: Sessions is a rounded inset stone box immediately before a full-bleed stone footer. Remove the box background/radius and 40px horizontal content inset; align facts and invitation to the existing page rails. Preserve logical grouping and existing necessary internal separators; add no borders.

## Assessment
Design specificity: editorial audience photography and personal introduction are appropriate to this practice; the boxed closing section feels more generic.
Cognitive load: low; the main concern is scrolling and section differentiation.
First-time visitor: clearer chapter boundaries would aid scanning toward practical information.
Mobile: preserve readable width and avoid stacking large outer gaps with new band padding. Mobile concerns are CSS-derived, not fresh rendered-mobile verification.

## Scoped heuristic scores
Scores normalized from reviewer's 1–5 ratings to 0–4.
1 System status: n/a, static layout assessment.
2 Real-world language: 4.
3 User control: 3.
4 Consistency: 3.
5 Error prevention: n/a, no input flow assessed.
6 Recognition: 3.
7 Efficiency: n/a, marketing presentation.
8 Minimalist design: 3.
9 Error recovery: n/a, no error flow assessed.
10 Help/documentation: n/a, outside this background assessment.
Total 16/20, scoped only; not a site-wide usability score.

## Detector
Zero reported findings, but regex fallback because parser dependencies were unavailable. This is inconclusive, not a clean validation. Required numbered labels and current palette are not defects.

## Evidence
Independent desktop browser inspections at 1280x720. Intro is full-width stone with 72px vertical padding. Audience section is transparent, content-width, with 144px bottom padding. Sessions is stone with a 16px radius and 40px internal horizontal inset. Footer is full-width stone.

## Next step
Apply the two changes together to v4 only, then inspect the combined transition. No website changes made in this review.
