"use client";

import { SanityDocument } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import Link from "next/link";

import {
  HOME_QUERYResult,
  PAGE_QUERYResult,
  PRODUCT_QUERYResult,
} from "../sanity.types";
import { studioUrl } from "../sanity/api";
import { dataAttr } from "../sanity/utils";
import { BlockRenderer } from "./block-renderer";

type Page =
  | NonNullable<PAGE_QUERYResult>
  | NonNullable<HOME_QUERYResult>
  | NonNullable<PRODUCT_QUERYResult>["editorial"];

type PageBuilderSection = {
  _key: string;
  _type: string;
};

type PageData = {
  _id: string;
  _type: string;
  pageBuilder?: PageBuilderSection[];
};

/**
 * The PageBuilder component is used to render the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
 */

export function PageBuilder(props: { page: Page }) {
  const { page } = props;
  const pageBuilderSections = useOptimistic<
    PageBuilderSection[] | undefined,
    SanityDocument<PageData>
  >(page?.pageBuilder ?? undefined, (currentSections, action) => {
    // The action contains updated document data from Sanity
    // when someone makes an edit in the Studio

    // If the edit was to a different document, ignore it
    if (action.id !== page._id) {
      return currentSections;
    }

    // If there are sections in the updated document, use them
    if (action.document.pageBuilder) {
      // Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
      return action.document.pageBuilder.map(
        (section) =>
          currentSections?.find((s) => s._key === section?._key) || section,
      );
    }

    // Otherwise keep the current sections
    return currentSections;
  });

  return pageBuilderSections && pageBuilderSections.length > 0
    ? renderSections(pageBuilderSections, page)
    : renderEmptyState(page);
}

function renderSections(pageBuilderSections: PageBuilderSection[], page: Page) {
  return (
    <div
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `pageBuilder`,
      }).toString()}
    >
      {pageBuilderSections.map((block, index) => (
        <BlockRenderer
          key={block._key}
          index={index}
          block={block}
          pageId={page._id}
          pageType={page._type}
        />
      ))}
    </div>
  );
}

function renderEmptyState(page: Page) {
  return (
    <div className="container">
      <h1>This page has no content</h1>
      <p>Open the page in Sanity Studio to add content.</p>
      <div>
        <Link
          href={`${studioUrl}/structure/intent/edit/template=page;type=page;path=pageBuilder;id=${page._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add content to this page
        </Link>
      </div>
    </div>
  );
}
