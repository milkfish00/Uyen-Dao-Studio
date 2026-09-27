import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, hasSanityConfig, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = hasSanityConfig
  ? createImageUrlBuilder({ projectId: projectId!, dataset: dataset! })
  : null;

export const urlFor = (source: SanityImageSource) => {
  if (!builder) {
    throw new Error(
      "Sanity image URLs are unavailable because NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET are not configured.",
    );
  }

  return builder.image(source);
};

/**
 * Builds a URL that respects the crop rectangle and hotspot editors set in the
 * Studio. Queries must return the whole image object (not `asset->url`) for the
 * crop to survive — a bare asset URL always points at the uncropped original.
 */
export const imageUrl = (
  source: SanityImageSource | null | undefined,
  width?: number,
): string | null => {
  if (!builder || !source) {
    return null;
  }

  try {
    const image = builder.image(source).auto("format").fit("crop");
    return (width ? image.width(width).height(width) : image).url();
  } catch {
    return null;
  }
};

/** Same as `imageUrl`, for arrays of images. Entries without an asset are dropped. */
export const imageUrls = (
  sources: (SanityImageSource | null | undefined)[] | null | undefined,
): string[] => {
  if (!sources) {
    return [];
  }

  return sources
    .map((source) => imageUrl(source))
    .filter((url): url is string => Boolean(url));
};
