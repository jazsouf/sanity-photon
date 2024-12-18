import { defineField, defineType } from "sanity";

export const newsletter = defineType({
  title: "Newsletter",
  name: "newsletter",
  type: "object",
  fields: [
    defineField({
      title: "Newsletter Title",
      name: "title",
      type: "string",
      description: "An optional title for the newsletter section.",
    }),
  ],
});
