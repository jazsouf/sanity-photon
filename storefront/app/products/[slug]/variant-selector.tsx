"use client";
import Form from "next/form";
import Price from "../../../components/price";
import { Product, ProductOption, ProductVariant } from "../../../shopify/types";
import { cx } from "../../../utils/cx";
import s from "./page.module.css";
import { useProduct, useUpdateURL } from "./product-context";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  priceRange,
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  priceRange: Product["priceRange"];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptions = !options.length;
  const hasJustOneOption =
    options.length === 1 && options[0]?.values.length === 1;

  if (hasNoOptions) {
    return (
      <Price
        amount={priceRange.minVariantPrice.amount}
        currencyCode={priceRange.minVariantPrice.currencyCode}
      />
    );
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const selectedVariant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );

  return (
    <>
      <span>
        {selectedVariant ? (
          <>
            <Price
              amount={selectedVariant.price.amount}
              currencyCode={selectedVariant.price.currencyCode}
            />
          </>
        ) : (
          <>
            <Price
              amount={priceRange.minVariantPrice.amount}
              currencyCode={priceRange.minVariantPrice.currencyCode}
            />
            {!hasJustOneOption && (
              <>
                {" — "}
                <Price
                  amount={priceRange.maxVariantPrice.amount}
                  currencyCode={priceRange.maxVariantPrice.currencyCode}
                />
              </>
            )}
          </>
        )}
      </span>
      {options
        // remove the default variant from Shopify
        .filter((option) => option.name !== "Title")
        .map((option) => (
          <Form key={option.id} action="">
            <dl className={s.line}>
              <dt>{option.name}</dt>
              <dd>
                {option.values?.map((value) => {
                  const optionNameLowerCase = option.name?.toLowerCase();

                  const optionParams = {
                    ...state,
                    [optionNameLowerCase]: value,
                  };

                  const filtered = Object.entries(optionParams).filter(
                    ([key, value]) =>
                      options.find(
                        (option) =>
                          option.name.toLowerCase() === key &&
                          option.values.includes(value),
                      ),
                  );
                  const isAvailableForSale = combinations.find((combination) =>
                    filtered.every(
                      ([key, value]) =>
                        combination[key] === value &&
                        combination.availableForSale,
                    ),
                  );

                  const isActive = state[optionNameLowerCase] === value;

                  return (
                    <button
                      formAction={() => {
                        const newState = updateOption(
                          optionNameLowerCase,
                          value,
                        );
                        updateURL(newState);
                      }}
                      key={value}
                      aria-disabled={!isAvailableForSale}
                      disabled={!isAvailableForSale}
                      title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                      className={cx(
                        s.option,
                        isActive && s.active,
                        !isAvailableForSale && s.outOfStock,
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </dd>
            </dl>
          </Form>
        ))}
    </>
  );
}
