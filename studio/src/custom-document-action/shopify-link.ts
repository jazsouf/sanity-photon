import { EarthGlobeIcon } from "@sanity/icons";
import type { DocumentActionDescription } from "sanity";

import {
  collectionUrl,
  productUrl,
  productVariantUrl,
} from "../utils/shopify-urls";
import type { ShopifyDocument, ShopifyDocumentActionProps } from "./types";

export const shopifyLink = (
  props: ShopifyDocumentActionProps,
): DocumentActionDescription | undefined => {
  const { published, type }: { published: ShopifyDocument; type: string } =
    props;

  if (!published || published?.store?.isDeleted) {
    return;
  }

  let url: string | null = null;

  if (type === "collection") {
    url = collectionUrl(published?.store?.id);
  }
  if (type === "product") {
    url = productUrl(published?.store?.id);
  }
  if (type === "variant") {
    url = productVariantUrl(published?.store?.productId, published?.store?.id);
  }

  if (!url) {
    return;
  }

  if (published && !published?.store?.isDeleted) {
    return {
      label: "Edit in Shopify",
      icon: EarthGlobeIcon,
      onHandle: () => {
        url ? window.open(url) : void "No URL";
      },
      shortcut: "Ctrl+Alt+E",
    };
  }
};
