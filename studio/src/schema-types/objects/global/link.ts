import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      initialValue: "url",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "URL", value: "href" },
          { title: "Home", value: "home" },
          { title: "PLP - All Products", value: "plp" },
          { title: "Page", value: "page" },
          { title: "Product", value: "product" },
          { title: "Collection", value: "collection" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "href",
      validation: (rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        rule.custom((value, context: any) => {
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
      validation: (rule) =>
        // Custom validation to ensure page reference is provided if the link type is 'page'
        rule.custom((value, context: any) => {
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
      validation: (rule) =>
        // Custom validation to ensure post reference is provided if the link type is 'product'
        rule.custom((value, context: any) => {
          if (context.parent?.linkType === "product" && !value) {
            return "Product reference is required when Link Type is Product";
          }
          return true;
        }),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
      hidden: ({ parent }) => parent?.linkType !== "collection",
      validation: (rule) =>
        // Custom validation to ensure post reference is provided if the link type is 'collection'
        rule.custom((value, context: any) => {
          if (context.parent?.linkType === "collection" && !value) {
            return "Collection reference is required when Link Type is Collection";
          }
          return true;
        }),
    }),
    defineField({
      name: "label",
      title: "Display Label",
      type: "string",
      description:
        "The label of the link. Required when it's a raw URL, otherwise the label will default to the name of the referenced link.",
      validation: (rule) =>
        // Custom validation to ensure the Display label is provided if the link type is 'href'
        rule.custom((value, context: any) => {
          if (context.parent?.linkType === "href" && !value) {
            return "Name for URL is required when Link Type is URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      validation: (rule) => rule.required(),
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      linkType: "linkType",
      label: "label",
      pageName: "page.name",
      productName: "product.store.title",
      collectionName: "collection.store.title",
      href: "href",
      pageSlug: "page.slug.current",
      productSlug: "product.store.slug.current",
      collectionSlug: "collection.store.slug.current",
    },
    prepare(selection) {
      const title =
        selection.label ??
        (selection.linkType === "home"
          ? "Home Page"
          : selection.linkType === "plp"
            ? "All Products Page"
            : selection.linkType === "page"
              ? selection.pageName
              : selection.linkType === "product"
                ? selection.productName
                : selection.linkType === "collection"
                  ? selection.collectionName
                  : "NO NAME FOUND");

      const subtitle =
        selection.linkType === "href"
          ? `-> ${selection.href}`
          : selection.linkType === "home"
            ? `-> /`
            : selection.linkType === "plp"
              ? "-> /collections/all"
              : selection.linkType === "page"
                ? `-> /${selection.pageSlug}`
                : selection.linkType === "product"
                  ? `-> /products/${selection.productSlug}`
                  : selection.linkType === "collection"
                    ? `-> /collections/${selection.collectionSlug}`
                    : "";
      return { title, subtitle };
    },
  },
});
