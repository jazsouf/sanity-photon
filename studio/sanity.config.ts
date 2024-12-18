/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import {
  defineDocuments,
  defineLocations,
  presentationTool,
  type DocumentLocation,
} from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { colorInput } from "@sanity/color-input";
import { customDocumentActions } from "./src/custom-document-action";
import { schemaTypes } from "./src/schema-types";
import { structure } from "./src/structure";
import { singletonTypes } from "./src/structure/singletons";

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "your-projectID";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

// Define the home location for the presentation tool
const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case "product":
      return slug ? `/products/${slug}` : undefined;
    case "page":
      return slug ? `/${slug}` : undefined;
    case "home":
      return "/";
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}

// Main Sanity configuration
export default defineConfig({
  name: "default",
  title: "Sanity Photon",
  projectId,
  dataset,
  plugins: [
    // Presentation tool configuration for Visual Editing
    presentationTool({
      title: "Preview",
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
        mainDocuments: defineDocuments([
          {
            route: "/",
            filter: `_type == "home"`,
          },
          {
            route: "/:slug",
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: "/products/:slug",
            filter: `_type == "product" && slug.current == $slug || _id == $slug`,
          },
        ]),
        // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: "This document is used on all pages",
            tone: "positive",
          }),
          page: defineLocations({
            select: {
              name: "name",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || "Untitled",
                  href: resolveHref("page", doc?.slug)!,
                },
              ],
            }),
          }),
          product: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Untitled",
                  href: resolveHref("product", doc?.slug)!,
                },
                {
                  title: "Home",
                  href: "/",
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    visionTool({ title: "API" }),
    colorInput(),
    customDocumentActions(),
  ],

  // Schema configuration, imported from ./src/schema/index.ts
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  tools: (prev, context) =>
    prev.filter((tool) => {
      if (tool.name === "schedules") {
        return false;
      } else if (!context.currentUser && tool.name === "presentation") {
        return false;
      }
      return true;
    }),
});
