import { asImageSrc, asLink, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { LazyVideo } from "@/app/components/LazyVideo";
import { LazyYouTubePlayer } from "@/app/components/LazyYouTubePlayer";
import { getDictionary, type Locale } from "@/lib/i18n";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice, { lang?: Locale }>;

/**
 * Component for "Video" Slices.
 */
const Video = ({ context, slice }: VideoProps) => {
  const labels = getDictionary(context.lang).video;

  return (
    <Bounded
      spacing={slice.primary.spacing}
      width={slice.primary.width}
    >
      {slice.variation === "default" ? (
        <LazyYouTubePlayer
          className="rounded-2xl"
          title={slice.primary.title || labels.youTube}
          youTubeID={slice.primary.youtube_id}
        />
      ) : (
        <LazyVideo
          className="rounded-2xl"
          poster={asImageSrc(slice.primary.poster)}
          src={
            slice.variation === "uploadedVideo"
              ? asLink(slice.primary.video_file)
              : asLink(slice.primary.video_url)
          }
          title={slice.primary.title || labels.fallbackTitle}
        />
      )}
    </Bounded>
  );
};

export default Video;
