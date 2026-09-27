import { defineArrayMember, defineField, defineType } from "sanity";
import { altField } from "./altField";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule.required().error("A project title is required before publishing."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Click generate",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule
          .required()
          .error("Generate a slug before publishing this project."),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      options: {
        list: [
          { title: "Industrial Design", value: "Industrial Design" },
          { title: "Brand Direction", value: "Brand Direction" },
          { title: "Fashion Styling", value: "Fashion Styling" },
          { title: "Illustration", value: "Illustration" },
        ],
      },
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "additionalInformation",
      title: "Additional Information",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      description:
        "The main image used to represent this project. Accepted files: JPG, PNG or WebP.",
      type: "image",
      options: { hotspot: true, accept: "image/jpeg,image/png,image/webp" },
 fields: [altField],
      validation: (rule) =>
        rule.required().error("A cover image is required before publishing."),
    }),
    defineField({
      name: "boards",
      title: "Board Images",
      description:
        "Drag images to rank them. The first image is used as the primary project image. Accepted files: JPG, PNG or WebP.",
      type: "array",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true, accept: "image/jpeg,image/png,image/webp" },
 fields: [altField],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      fallbackMedia: "boards.0",
      subtitle: "year",
    },
    prepare({ title, media, fallbackMedia, subtitle }) {
      return {
        title,
        media: media || fallbackMedia,
        subtitle: subtitle ? String(subtitle) : "Project",
      };
    },
  },
});
