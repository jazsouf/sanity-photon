import createImageUrlBuilder from "@sanity/image-url";
import { createDataAttribute, CreateDataAttributeProps } from "next-sanity";
import { Link, ProductVariant, ShopifyProduct } from "../sanity.types";
import { dataset, projectId, studioUrl } from "./api";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) return null;

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = "href";
  }

  switch (link.linkType) {
    case "href":
      return link.href || null;
    case "page":
      if (link?.page && typeof link.page === "string") {
        return `/${link.page}`;
      }
    case "product":
      if (link?.product && typeof link.product === "string") {
        return `/posts/${link.product}`;
      }
    default:
      return null;
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, "id" | "type" | "path">>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}

export function getSelectedOptions({
  options = [],
  variant,
}: {
  options: ShopifyProduct["options"];
  variant: ProductVariant;
}) {
  // Sanity connect is silly here. TODO implement custom sync handler

  const selectedOptions = [
    { name: options[0]?.name ?? "", value: variant.store?.option1 ?? "" },
    { name: options[1]?.name ?? "", value: variant.store?.option2 ?? "" },
    { name: options[3]?.name ?? "", value: variant.store?.option3 ?? "" },
  ].filter((s) => s.name && s.value);

  return selectedOptions;
}
