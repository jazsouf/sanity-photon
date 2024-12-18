import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "linkType",
                title: "Link Type",
                type: "string",
                initialValue: "href",
                options: {
                  list: [
                    { title: "URL", value: "href" },
                    { title: "Page", value: "page" },
                    { title: "Product", value: "product" },
                  ],
                  layout: "radio",
                },
              }),
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                hidden: ({ parent }) =>
                  parent?.linkType !== "href" && parent?.linkType != null,
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === "href" && !value) {
                      return "URL is required when Link Type is URL";
                    }
                    return true;
                  }),
              }),
              defineField({
                name: "page",
                title: "Page",
                type: "reference",
                to: [{ type: "page" }],
                hidden: ({ parent }) => parent?.linkType !== "page",
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === "page" && !value) {
                      return "Page reference is required when Link Type is Page";
                    }
                    return true;
                  }),
              }),
              defineField({
                name: "product",
                title: "Product",
                type: "reference",
                to: [{ type: "product" }],
                hidden: ({ parent }) => parent?.linkType !== "product",
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === "product" && !value) {
                      return "Product reference is required when Link Type is Product";
                    }
                    return true;
                  }),
              }),
              defineField({
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
  ],
});
