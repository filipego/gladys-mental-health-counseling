# Homepage studies

Serve this directory with `python3 -m http.server 3000 --bind 127.0.0.1`.

- v1–v3: original studies, preserved except for additional version-switcher links.
- v4 — Considered: unchanged split hero, seated-portrait introduction, open photographic audience rows, and a horizontal practical-information/consultation composition.
- v5 — Open House: unchanged arched hero image, introduction portrait on the right, three-column photographic audience spread, and a unified stone/wine consultation panel.
- v6 — In Focus: integrated portrait panel and a large fixed service image that changes with pointer entry or keyboard focus.

V4–v6 share `refinements.css`, `rebuild.css`, and `refinements.js`. The rebuild stylesheet only targets sections below the hero. Hero markup is byte-identical to the prior versions, and the complete text-node inventory is unchanged. Audience images are approved AI-generated editorial illustrations of fictional people, not photographs of clients. Gladys's supplied portrait remains in her introduction. Inter is served locally from the existing hero prototype font.

These are static design previews: consultation, About and service links remain local section anchors. No form submissions, other pages or production app changes are included. Privacy exposes a prototype notice.

September 13 verification: rendered desktop and 390px mobile inspection; no horizontal overflow at 390px across v4–v6; v6 keyboard focus changed its preview image; six-way version navigation present. The Impeccable scan returned no matches but used a degraded regex fallback because parser modules were absent. No Next.js build checks were needed for these standalone HTML/CSS/JS studies.
