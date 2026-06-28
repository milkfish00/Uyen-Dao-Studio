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
