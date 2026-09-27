import { defineField } from "sanity";

import { SITE_IMAGE_ALT } from "../lib/siteAlt";

/**
 * Fixed alt text for images. Locked so editors can't change it; the front end
 * also always renders SITE_IMAGE_ALT regardless of what is stored.
 */
export const altField = defineField({
  name: "alt",
  title: "Alt Text",
  description: "Fixed for every image.",
  type: "string",
  initialValue: SITE_IMAGE_ALT,
  readOnly: true,
});
