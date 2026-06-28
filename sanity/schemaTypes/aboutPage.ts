import { defineArrayMember, defineField, defineType } from "sanity";

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
      type: "image",
      options: { hotspot: true },
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
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
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
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Recognition",
                subtitle: subtitle ? String(subtitle) : undefined,
                media,
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
