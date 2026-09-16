# Hero shortlist

Three hero prototypes remain in the preview:

1. Making room for change. Original option 4, unchanged.
2. From tangled to understood. Original option 5, retaining the added room above the head. Static and unchanged.
3. Quiet signals. Same layout and crop as 2, with supplied neural frames crossfaded over 6.5 seconds.

Everything below the hero has been removed. Rejected options are no longer available in the preview. No further visual or responsive work was performed for this shortlist change.

Run from the project root:

```sh
python3 -m http.server 8766 --bind 127.0.0.1 --directory prototypes/hero
```

Open http://127.0.0.1:8766/?variant=1 or ?variant=2.

The prototype uses #FDFCFC and the existing Inter foundation. Both retained artworks are generated illustrations. This is a local visual prototype, not a published website.

## Neural animation

Visual inspection established the order: original calm image, supplied 08_52_59 (1) glow within the tangle, (2) branch spread, (3) peak, 08_53_00 (4) fading, then original. Source files copied unchanged into assets/neural-1.png through neural-4.png. CSS animates opacity only. All five images decode before animation starts; failures leave the original visible. Absolute layers share the existing fixed artwork bounds and top-aligned crop. Reduced-motion CSS hides the animated layers and shows the original. No timers, per-frame JavaScript, transforms, brightness changes, audio or animation controls.
