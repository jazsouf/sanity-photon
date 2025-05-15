"use client";

import { Product, ProductVariant } from "../../shopify/types";
import { useProduct } from "../products/[slug]/product-context";
import { useCart } from "./cart-context";

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;

  const selectedVariantId = variant?.id || defaultVariantId;

  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={() => {
        addCartItem(finalVariant, product);
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
    </form>
  );
}

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  if (!availableForSale) {
    return <button disabled>Out Of Stock</button>;
  }

  if (!selectedVariantId) {
    return (
      <button aria-label="Please select an option" disabled>
        Add To Cart
      </button>
    );
  }

  return (
    <button aria-label="Add to cart">
      <b>Add To Cart</b>
    </button>
  );
}
