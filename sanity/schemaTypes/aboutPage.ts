import { createElement } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";
import { altField } from "./altField";

// Built here (not via lib/image) because that helper is gated on a dynamic
// process.env lookup that Next doesn't inline into the browser-side Studio.
const thumbBuilder = createImageUrlBuilder({
  projectId: projectId || "missing-project-id",
  dataset: dataset || "missing-dataset",
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      description: "Accepted files: JPG, PNG or WebP.",
      type: "image",
      options: { hotspot: true, accept: "image/jpeg,image/png,image/webp" },
 fields: [altField],
    }),
    defineField({
      name: "recognitions",
      title: "Recognitions",
      type: "array",
      of: [
        defineArrayMember({
          name: "recognition",
          title: "Recognition",
          type: "object",
          fields: [
            defineField({
              name: "images",
              title: "Images",
              description:
                "Add multiple images to display as an autoplaying slider. Accepted files: JPG, PNG or WebP.",
              type: "array",
              options: { layout: "grid" },
              of: [
                defineArrayMember({
                  type: "image",
                  options: {
                    hotspot: true,
                    accept: "image/jpeg,image/png,image/webp",
                  },
 fields: [altField],
                }),
              ],
            }),
            defineField({
              name: "awardName",
              title: "Award Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "year",
              title: "Year",
              type: "number",
              validation: (rule) => rule.integer().min(1900).max(3000),
            }),
            defineField({
              name: "description",
              title: "Small Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "awardName",
              subtitle: "year",
              images: "images",
            },
            prepare({ title, subtitle, images }) {
              // Array-item previews don't resolve `images.0` into a thumbnail,
              // so build it from the first image directly.
              const first = Array.isArray(images) ? images[0] : undefined;
              const thumbnail = first?.asset
                ? thumbBuilder
                    .image(first)
                    .width(96)
                    .height(96)
                    .fit("crop")
                    .auto("format")
                    .url()
                : undefined;
              return {
                title: title || "Recognition",
                subtitle: subtitle ? String(subtitle) : undefined,
                media: thumbnail
                  ? createElement("img", {
                      src: thumbnail,
                      alt: "",
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      },
                    })
                  : undefined,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
      };
    },
  },
});
