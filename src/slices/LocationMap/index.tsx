import { Content, isFilled } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { PrismicRichText } from "@/app/components/PrismicRichText";
import { TextLink } from "@/app/components/TextLink";

export type LocationMapProps = SliceComponentProps<Content.LocationMapSlice>;

const LocationMap = ({ slice }: LocationMapProps) => {
  const address = slice.primary.address?.trim();
  const mapEmbedUrl = address
    ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`
    : null;

  return (
    <section
      className="location-map-slice"
      id="location"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className="location-map-slice__bounded" spacing="none">
        <div className="location-map-slice__grid">
          <div className="location-map-slice__reading">
            {slice.primary.heading ? (
              <Heading as="h2" className="location-map-slice__heading" size="md">
                {slice.primary.heading}
              </Heading>
            ) : null}

            {isFilled.richText(slice.primary.body) ? (
              <PrismicRichText
                className="location-map-slice__body"
                field={slice.primary.body}
              />
            ) : null}

            {isFilled.link(slice.primary.map_link) &&
            slice.primary.map_link.text ? (
              <TextLink
                className="location-map-slice__link"
                field={slice.primary.map_link}
              >
                {slice.primary.map_link.text}
              </TextLink>
            ) : null}
          </div>

          {mapEmbedUrl ? (
            <figure className="location-map-slice__map">
              <iframe
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedUrl}
                title={`Map of ${address}`}
              />
            </figure>
          ) : null}
        </div>
      </Bounded>
    </section>
  );
};

export default LocationMap;
