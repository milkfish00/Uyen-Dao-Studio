import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * brandCreativeCase — individual carousel cards shown on the
 * Brand & Creative Direction sub-page.
 *
 * sectionType drives which carousel the card appears in:
 *   "brand-direction"  → maps to projects tagged "Brand Direction"
 *   "fashion-styling"  → maps to projects tagged "Fashion Styling"
 */
export const brandCreativeCase = defineType({
  name: "brandCreativeCase",
  title: "Brand & Creative Case",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "display", title: "Display" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "Short descriptive text shown beneath the card title.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category Label",
      description:
        "Small label shown on the card (e.g. 'Editorial', 'Campaign').",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "sectionType",
      title: "Section",
      description:
        "Which carousel this case belongs to. Only projects tagged 'Brand Direction' should use 'brand-direction'; only projects tagged 'Fashion Styling' should use 'fashion-styling'.",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Brand Direction", value: "brand-direction" },
          { title: "Fashion Styling", value: "fashion-styling" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "linkedProject",
      title: "Linked Project",
      description:
        "Optional reference to a project document. Only projects tagged 'Brand Direction' or 'Fashion Styling' are relevant here.",
      type: "reference",
      to: [{ type: "project" }],
      group: "content",
      options: {
        filter: 'skills[] in ["Brand Direction", "Fashion Styling"]',
      },
    }),
    defineField({
      name: "image",
      title: "Card Image",
      description: "Image displayed in the carousel card.",
      type: "image",
      options: { hotspot: true },
      group: "display",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Background (Tailwind class)",
      description:
        "Tailwind background class for the card image area, e.g. bg-[#eaded4].",
      type: "string",
      group: "display",
      placeholder: "bg-[#eaded4]",
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Controls sort order within the carousel.",
      type: "number",
      group: "display",
    }),
  ],
  orderings: [
    {
      title: "Section then Order",
      name: "sectionOrder",
      by: [
        { field: "sectionType", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "sectionType",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      const label =
        subtitle === "brand-direction"
          ? "Brand Direction"
          : subtitle === "fashion-styling"
            ? "Fashion Styling"
            : (subtitle ?? "");
      return { title, subtitle: label, media };
    },
  },
});
