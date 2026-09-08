import { PrismicNextImage } from "@prismicio/next";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";

/**
 * Props for `Image`.
 */
export type ImageProps = SliceComponentProps<Content.ImageSlice>;

/**
 * Component for "Image" Slices.
 */
const Image = ({ slice }: ImageProps) => {
  if (!isFilled.image(slice.primary.image)) return null;

  return (
    <Bounded
      spacing={slice.primary.spacing}
      width={slice.primary.width}
    >
      <div
        className={
          slice.variation === "twoUp" ? "grid gap-5 md:grid-cols-2" : ""
        }
      >
        <PrismicNextImage
          className="h-auto w-full rounded-2xl object-cover"
          fallbackAlt=""
          field={slice.primary.image}
        />
        {slice.variation === "twoUp" &&
          isFilled.image(slice.primary.second_image) && (
            <PrismicNextImage
              className="h-auto w-full rounded-2xl object-cover"
              fallbackAlt=""
              field={slice.primary.second_image}
            />
          )}
      </div>
    </Bounded>
  );
};

export default Image;
