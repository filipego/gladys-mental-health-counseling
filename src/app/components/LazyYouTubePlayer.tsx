"use client";

import type { KeyTextField } from "@prismicio/client";
import clsx from "clsx";

type LazyYouTubePlayerProps = {
  youTubeID: KeyTextField;
  /** Describes the embedded video for screen-reader users. */
  title?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
};

export function LazyYouTubePlayer({
  youTubeID,
  title = "YouTube video",
  className,
  autoPlay = false,
  loop = false,
  controls = true,
}: LazyYouTubePlayerProps) {
  if (!youTubeID) {
    return null;
  }

  const videoID = encodeURIComponent(youTubeID);
  const params = new URLSearchParams({
    autoplay: autoPlay ? "1" : "0",
    controls: controls ? "1" : "0",
    loop: loop ? "1" : "0",
    mute: autoPlay ? "1" : "0",
    playsinline: "1",
    rel: "0",
  });

  if (loop) {
    params.set("playlist", youTubeID);
  }

  return (
    <div
      className={clsx("relative aspect-video w-full overflow-hidden", className)}
    >
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        src={`https://www.youtube-nocookie.com/embed/${videoID}?${params.toString()}`}
        title={title}
      />
    </div>
  );
}
