# Hosted style review

The client-facing HTML style review is a separate Sites project under `planning/style-site`, with its own Git repository and dependencies. It does not query Prismic or change the main website. The main TypeScript and ESLint configs exclude that folder.

Its `.openai/hosting.json` owns the Sites registration. Reuse that project ID for all updates; do not create another Site. Keep credentials out of source.

The page mirrors the current website's palette and Inter typography. Button samples use 36/44/52px minimum heights and 14/14/16px text, without scaling a page-sized canvas. It uses the Sites starter's button primitive styled to those dimensions, not the Prismic link component. Link samples navigate within the style review and never submit a consultation request.

The local page returned HTTP 200 and the Sites production build passed. In-app browser checks at 1280px and 390px verified no horizontal overflow, loaded Inter, all five responsive heading sizes, and all three neutral button sizes. Mobile heading sizes are 36/32/28/22/18px; desktop sizes are 48/36/32/24/20px. Button heights are 52/44/36px in both layouts, with 16/14/14px text. The existing main project TypeScript check passed after isolating the review project. The client review is not a replacement for the main website or a full design prototype.

Published URL: https://gladys-website-style.filipego862341.chatgpt.site

Sharing preference: restricted to Gladys's email. The address and invitation are pending user confirmation; keep owner-only access until confirmed.
