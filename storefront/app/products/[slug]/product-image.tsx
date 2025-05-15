import NextImage from "next/image";
import { Image } from "../../../shopify/types";

export function ProductImage({
  shopifyImage,
  sizes = "33vw",
  objectFit = "contain",
  loading = "lazy",
}: {
  shopifyImage: Image;
  sizes?: string;
  objectFit?: string;
  loading?: "lazy" | "eager" | undefined;
}) {
  return (
    <NextImage
      loading={loading}
      priority={loading === "lazy" ? undefined : true}
      src={shopifyImage.url}
      width={shopifyImage.width}
      height={shopifyImage.height}
      alt={shopifyImage.altText}
      sizes={sizes}
      className={objectFit}
    />
  );
}
