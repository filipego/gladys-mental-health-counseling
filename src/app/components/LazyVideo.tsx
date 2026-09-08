"use client";

import clsx from "clsx";

type LazyVideoProps = { src?: string | null; title?: string; poster?: string | null; className?: string };

export function LazyVideo({ src, title = "Video", poster, className }: LazyVideoProps) {
  if (!src) return null;
  return (
    <div className={clsx("relative aspect-video w-full overflow-hidden", className)}>
      <video
        aria-label={title}
        className="h-full w-full"
        controls
        poster={poster ?? undefined}
        preload="metadata"
      >
        <source src={src} />
      </video>
    </div>
  );
}
