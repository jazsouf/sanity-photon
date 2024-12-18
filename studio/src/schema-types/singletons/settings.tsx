import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: "settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "The title of your storefront.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "header",
      type: "header",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footer",
      type: "footer",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "defaultProductInformation",
      description: "These fields show on every product page unless overwritten",
      type: "array",
      of: [{ type: "productInformation" }],
    }),
    defineField({
      name: "metadataBase",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
      description: (
        <span>
          {
            "The base url of your website. It should include protocol and full domain name. example -> https://mydomain.com"
          }
          <a
            href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
            rel="noreferrer noopener"
            target="_blank"
          >
            More information
          </a>
        </span>
      ),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
