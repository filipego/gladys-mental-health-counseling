"use client";

import type { KeyTextField } from "@prismicio/client";
import clsx from "clsx";

import { useLazyIframe } from "./useLazyIframe";

type LazyTikTokPlayerProps = {
  tikTokID: KeyTextField;
  /** Describes the embedded TikTok post for screen-reader users. */
  title?: string;
  className?: string;
  /** How far before entering the viewport the video should begin loading. */
  rootMargin?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
};

export function LazyTikTokPlayer({
  tikTokID,
  title = "TikTok video",
  className,
  rootMargin,
  autoPlay = false,
  loop = false,
  controls = true,
}: LazyTikTokPlayerProps) {
  const { containerRef, isInView } = useLazyIframe(rootMargin);

  if (!tikTokID) {
    return null;
  }

  const videoID = encodeURIComponent(tikTokID);
  const params = new URLSearchParams({
    autoplay: autoPlay ? "1" : "0",
    controls: controls ? "1" : "0",
    description: "0",
    loop: loop ? "1" : "0",
    music_info: "0",
    rel: "0",
  });

  // Browsers commonly block unmuted autoplay. TikTok's muted mode also locks
  // the volume control, so it is enabled only when autoplay is requested.
  if (autoPlay) {
    params.set("muted", "1");
  }

  return (
    <div
      className={clsx(
        "relative aspect-[9/16] w-full overflow-hidden rounded-xl shadow-xl",
        className
      )}
      ref={containerRef}
    >
      {isInView && (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          src={`https://www.tiktok.com/player/v1/${videoID}?${params.toString()}`}
          title={title}
        />
      )}
    </div>
  );
}
