import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Full description shown on the services page.",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "learnMoreHref",
      title: "Learn More URL",
      description:
        'Optional path for the "Learn More" button, e.g. /services/brand-creative-direction. Leave blank to hide the button.',
      type: "string",
    }),
    defineField({
      name: "items",
      title: "What I Help With",
      description:
        "Bullet-point list of deliverables shown on the services page.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "summary",
      title: "Summary (Rich Text)",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
});
