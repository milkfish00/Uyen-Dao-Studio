import { defineArrayMember, defineField, defineType } from "sanity";

const SITE_IMAGE_ALT = "Uyen Dao Studio";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "studioName",
      title: "Studio Name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "focusLabel",
      title: "Focus Label",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "descriptionText",
      title: "Description Text",
      type: "text",
      group: "general",
      rows: 4,
    }),
    defineField({
      name: "heroImages",
      title: "Hero Images",
      type: "array",
      group: "general",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              initialValue: SITE_IMAGE_ALT,
              readOnly: true,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule.email().warning("Use a valid email address format."),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      group: "contact",
      description: "Use the public-facing phone number for the site.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      group: "social",
      of: [
        defineArrayMember({
          name: "socialLink",
          title: "Social Link",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Default title tag for the website.",
      validation: (rule) =>
        rule
          .max(60)
          .warning(
            "Search results usually truncate titles after about 60 characters.",
          ),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      group: "seo",
      rows: 3,
      description: "Default meta description for the website.",
      validation: (rule) =>
        rule
          .max(160)
          .warning(
            "Search results usually truncate descriptions after about 160 characters.",
          ),
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO Tags",
      type: "array",
      group: "seo",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "noIndex",
      title: "Hide From Search Engines",
      type: "boolean",
      group: "seo",
      initialValue: false,
    }),
    defineField({
      name: "openGraph",
      title: "Open Graph",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "Open Graph Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Open Graph Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "image",
          title: "Open Graph Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              initialValue: SITE_IMAGE_ALT,
              readOnly: true,
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "studioName",
    },
    prepare({ title }) {
      return {
        title: title || "Site Settings",
      };
    },
  },
});
