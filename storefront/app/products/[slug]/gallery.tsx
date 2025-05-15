"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductVariant, Image } from "../../../shopify/types";
import { ProductImage } from "./product-image";
import { useProduct } from "./product-context";
import s from "./gallery.module.css";

export function Gallery({
  variants,
  featuredImage,
}: {
  variants: ProductVariant[];
  featuredImage: Image;
}) {
  const { state } = useProduct();
  const searchParams = useSearchParams();
  const [activeImage, setActiveImage] = useState<Image>(featuredImage);

  // Update active image when search params change
  useEffect(() => {
    // If no search params are set, use the featured image
    if (Object.keys(state).length === 0) {
      setActiveImage(featuredImage);
      return;
    }

    // Find a matching variant based on selected options
    const activeOptions = Object.entries(state).filter(
      ([key, value]) => key !== "image" && value,
    );

    if (activeOptions.length > 0) {
      // Find variants that match all or partial selected options
      const matchingVariant = variants.find((variant) =>
        activeOptions.every(([name, value]) =>
          variant.selectedOptions.some(
            (option) =>
              option.name.toLowerCase() === name && option.value === value,
          ),
        ),
      );

      if (matchingVariant && matchingVariant.image) {
        setActiveImage(matchingVariant.image);
      }
    }
  }, [searchParams, state, variants, featuredImage]);

  // Check if there's only one variant
  const hasSingleVariant = variants.length <= 1;

  // If there's only one variant, just show the featured image
  if (hasSingleVariant) {
    return (
      <div className={s.gallery}>
        <div className={s.mainImage}>
          <ProductImage
            shopifyImage={featuredImage}
            sizes="100vw"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={s.gallery}>
      <div className={s.mainImage}>
        <ProductImage
          shopifyImage={activeImage}
          sizes="100vw"
          loading="eager"
        />
      </div>
      <div className={s.thumbnailContainer}>
        <div
          className={
            activeImage.url === featuredImage.url
              ? s.activeThumbnail
              : s.thumbnail
          }
          onClick={() => setActiveImage(featuredImage)}
        >
          <ProductImage
            shopifyImage={featuredImage}
            sizes="10vw"
            loading="eager"
          />
        </div>

        {variants.map(
          (variant) =>
            variant.image && (
              <div
                key={variant.id}
                className={
                  activeImage.url === variant.image.url
                    ? s.activeThumbnail
                    : s.thumbnail
                }
                onClick={() => setActiveImage(variant.image)}
              >
                <ProductImage
                  shopifyImage={variant.image}
                  sizes="10vw"
                  loading="eager"
                />
              </div>
            ),
        )}
      </div>
    </div>
  );
}
