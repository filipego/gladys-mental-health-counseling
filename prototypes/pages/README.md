# Page demos

The client-facing set is **Home · About · Therapy**. The switcher at the bottom right of each page links only to those selected pages.

The folder is self-contained for handoff: `assets/` contains every image and the Inter font, while the shared `refinements.css`, `rebuild.css`, and `refinements.js` files are local copies used by the pages.

## Therapy & Support

Source copy: the Therapy & Support section of `/Volumes/Extreme Pro/medias/Gladys Voice - Hero Revision.docx`. The Circle of Security training, the approach list and the fees still require client confirmation.

Therapy v1 — Place Yourself is the selected composition: the opening, a stone index of the three audiences, Parents as the deepest chapter beside a photograph, Teens on stone, Adults on paper, approaches on the wine band, and the session details closing with the consultation button.

Per-section calls to action are text links; the solid pill is reserved for the page's close, so the page does not read as three separate offers.

Captures at 1440 and 390 px are in `.impeccable/review/therapy-support/`. No consultation form is implemented; every action points at the Get Started placeholder.

## About Gladys

Source copy: `/Volumes/Extreme Pro/medias/Gladys Voice - Hero Revision.docx`. All five About sections are present verbatim in each option; nothing was rewritten, added, or cut. Professional claims (NYU Steinhardt, Circle of Security, Discover and Grow, expressive arts) are supplied draft copy and require client confirmation before publication.

**About v1 - Portrait.html** is the selected composition: an introduction beside a tall standing portrait, an open approach chapter, a stone context band, and a background chapter with a second photograph.

Home v4 chrome, palette, typeface, buttons, header and footer are unchanged and still authoritative. See `DESIGN.md` for the ramp and tokens, `RESEARCH.md` for prior research.

## Review

Preview server: `python3 -m http.server 3002 --bind 127.0.0.1 --directory prototypes` from the repository root, then open `http://127.0.0.1:3002/pages/About%20v1%20-%20Portrait.html` and use the switcher at the bottom right.

Reviewed at 1440, 900, and 390 px; captures are in `.impeccable/review/`. Therapy & Support and Get Started link to explicit unfinished route placeholders. No consultation form is implemented.

## Open items

- The portraits are supplied stand-ins. The selected opening portrait would benefit from a taller original frame than the current 1086 × 1448 file.
- `Home.html` still runs "When you know something with your child feels off" and "Who I work with" together as one undifferentiated stretch. Not addressed here.
