import { defineField, defineType } from "sanity";

export const productInformation = defineType({
  title: "product Information",
  name: "productInformation",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "content",
      type: "blockContent",
    }),
  ],
});
