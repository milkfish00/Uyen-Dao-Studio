import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanityConfig, projectId } from "../env";

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    })
  : null;
