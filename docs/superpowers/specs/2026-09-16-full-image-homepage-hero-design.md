# Full-Image Homepage Hero Design

## Outcome

Add a third Hero slice variation named `Full Image Homepage Hero`. Keep the current Homepage Hero and Inner Page Hero unchanged.

## Content model

The new variation uses the same heading, lead, supporting copy, calls to action, and helper copy fields as Homepage Hero. It replaces the animation poster with one `Background image` field.

## Presentation

The image fills the hero background. The existing homepage copy column, type, CTA layout, width, and vertical position remain unchanged. A restrained warm gradient covers only the copy side so the supplied image remains legible without changing text colors.

The hero keeps the current desktop and mobile height for the first test. The supplied chair image is biased toward the right edge so its open wall remains behind the copy.

## Header behavior

On a page whose first slice is Full Image Homepage Hero, the sticky header is transparent while it overlaps the hero. It returns to the existing solid white surface and border when the hero has scrolled past. Other pages and hero variations keep the existing header behavior.

## Verification

Render the selected Home document at desktop and 390px. Verify that the original hero variation still renders, the new background fills without distortion, copy geometry is unchanged, the header transition occurs at the hero boundary, and inner-page headers remain unchanged.
