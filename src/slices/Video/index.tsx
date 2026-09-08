import { asImageSrc, asLink, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { LazyVideo } from "@/app/components/LazyVideo";
import { LazyYouTubePlayer } from "@/app/components/LazyYouTubePlayer";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video = ({ slice }: VideoProps) => {
  return (
    <Bounded
      spacing={slice.primary.spacing}
      width={slice.primary.width}
    >
      {slice.variation === "default" ? (
        <LazyYouTubePlayer
          className="rounded-2xl"
          title={slice.primary.title || "YouTube video"}
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
          title={slice.primary.title || "Video"}
        />
      )}
    </Bounded>
  );
};

export default Video;
