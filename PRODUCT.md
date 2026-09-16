# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing Next.js 16 + Prismic site for production. Current visual exploration is a throwaway static prototype under `prototypes/homepage`.

## Users

Primary homepage visitor: a parent in New York who is worried about a child or teenager and is deciding whether to request a first conversation.

Secondary visitors, served on the same site rather than as the homepage's first job: teenagers, and adults seeking therapy for themselves.

## Product Purpose

The site exists so a visitor can understand Gladys's way of working and request a free 15-minute consultation. Success is a consultation request, not a booked session and not entertainment.

## Positioning

Gladys is a Mental Health Counselor – Limited Permit (MHC-LP) working under John Orr, LMHC. She works with parents, teens, and adults in English and Spanish, in person in New York City and by telehealth. The work looks underneath repeating patterns rather than only at the behavior in front of her.

## Operating Context

Four intended pages: Home, About Gladys, Therapy & Support, Get Started. Privacy is a footer utility page once data handling is known. The live exploration surface for this work is `prototypes/homepage`, not the Prismic Next.js app.

## Capabilities and Constraints

- Canonical copy is the Hero Revision Word document (opening, intro, parent concerns, who I work with, practical details).
- Primary action wording is “Request a free consultation,” leading to `/get-started#consultation`. Do not use “Schedule” unless visitors can actually reserve a time.
- Hero artwork on the current prototype is a temporary stand-in; a different image will replace it.
- Little parallax or effect-led motion. Calm, clean, conversion-led.
- Visual tokens already exist: Inter; paper `#FDFCFC`; stone `#F5F3F1`; border `#EBE8E4`; black primary pills. Do not invent a second palette.
- Fees, address, insurance, supervision, and credentials are stated in the copy and are not independently verified here.
- Hosted style HTML exists but is currently sign-in gated; `context/design-system.md` and `src/app/globals.css` are the accessible token source.

## Brand Commitments

Name: Gladys Henriquez. First-person voice throughout. No eyebrow labels above headings. Parents addressed first.

## Evidence on Hand

- Copy: `planning/copy-review/` and `/Volumes/Extreme Pro/medias/Gladys Voice - Hero Revision.docx`
- Gladys portraits (five poses): `prototypes/images/ChatGPT Image Sep 9, 2026, 08_27_59 PM (1–3).png` and `08_28_00 PM (4–5).png`. Pose (1) is also at `prototypes/hero/assets/gladys-portrait.png`.
- Neural hero frames in the same images folder are not portraits.
- Style sheet PDF: `output/pdf/Gladys Henriquez - Website Style.pdf`

## Product Principles

- Convert a worried parent into a consultation request without making the site feel salesy or clinical.
- Keep information easy to find after the first impression of care.
- Stay truthful: credentials, fees, languages, and supervision as written.
- Use real photographs of Gladys for the introduction; do not invent testimonials or client faces.
- Prototype in the homepage studies file until a layout is chosen; do not treat that file as production.

## Accessibility & Inclusion

Sessions in English and Spanish. Emergency notice required near the form and in the footer (911 / 988). Keyboard-visible controls and readable supporting text (not faint ash/smoke).
