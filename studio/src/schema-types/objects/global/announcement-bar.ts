import { defineField, defineType } from "sanity";

export const announcementBar = defineType({
  name: "announcementBar",
  title: "Announcement Bar",
  type: "object",
  fields: [
    defineField({
      type: "string",
      name: "content",
      title: "Text content",
      description:
        "The text will be displayed at the top of every page if this field is not empty.",
    }),
    defineField({
      type: "array",
      name: "links",
      description: "Wrap the announcement bar text in a link. Optional",
      title: "InfoBar Link",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.max(1),
    }),
  ],
});
