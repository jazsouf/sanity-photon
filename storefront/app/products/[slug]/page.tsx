import NextImage from "next/image";

import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";
import { Suspense } from "react";
import { PageBuilder } from "../../../components/page-builder";
import Price from "../../../components/price";
import { sanityFetch } from "../../../data/sanity";
import {
  ALL_PRODUCT_PAGES_SLUGS,
  PRODUCT_METADATA_QUERY,
  PRODUCT_QUERY,
} from "../../../data/sanity/queries";
import { getProduct, getProductRecommendations } from "../../../data/shopify";
import { resolveOpenGraphImage } from "../../../sanity/utils";
import { Image, Product } from "../../../shopify/types";
import { AddToCart } from "../../_cart/add-to-cart";
import s from "./page.module.css";
import { ProductProvider } from "./product-context";
import { VariantSelector } from "./variant-selector";
import { CustomPortableText } from "../../../components/custom-portable-text";
import { PortableTextBlock } from "next-sanity";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: ALL_PRODUCT_PAGES_SLUGS,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const { data: product } = await sanityFetch({
    query: PRODUCT_METADATA_QUERY,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(product?.store?.previewImageUrl);

  return {
    title: product?.store?.title,
    description: product?.store?.descriptionHtml,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;

  // get the sanity syncTags from lcapi so we can revalidate the shopify queries, more info: https://github.com/sanity-io/lcapi-examples
  const { tags, data: productPage } = await sanityFetch({
    query: PRODUCT_QUERY,
    params,
  });

  const product = await getProduct({ handle: params.slug, tags });

  if (!product?.id) {
    return notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <ProductProvider>
        <div>
          <div className={s.page}>
            <div>
              <ProductImage
                shopifyImage={product.featuredImage}
                sizes="50vw"
                loading="eager"
              />
            </div>
            <div className={s.productDetails}>
              <ProductDescription product={product} />
              <div>
                {productPage?.overwriteDefaultInformationFields ===
                  "complementDefaults" && (
                  <>
                    {productPage?.defaultProductInformation?.map(
                      (information) => {
                        return (
                          <details key={information._key}>
                            <summary>{information.title}</summary>
                            <CustomPortableText
                              value={information.content as PortableTextBlock[]}
                            />
                          </details>
                        );
                      },
                    )}
                    {productPage?.productInformation?.map((information) => {
                      return (
                        <details key={information._key}>
                          <summary>{information.title}</summary>
                          <CustomPortableText
                            value={information.content as PortableTextBlock[]}
                          />
                        </details>
                      );
                    })}
                  </>
                )}
                {productPage?.overwriteDefaultInformationFields ===
                  "noDefaults" &&
                  productPage?.productInformation?.map((information) => {
                    return (
                      <details key={information._key}>
                        <summary>{information.title}</summary>
                        <CustomPortableText
                          value={information.content as PortableTextBlock[]}
                        />
                      </details>
                    );
                  })}
              </div>
            </div>
          </div>
          {!!productPage?.pageBuilder?.length && (
            <PageBuilder page={productPage} />
          )}
        </div>
        <Suspense>
          <aside>
            <RelatedProducts tags={tags} id={product.id} />
          </aside>
        </Suspense>
      </ProductProvider>
    </Suspense>
  );
}

function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div>
        <h1>{product.title}</h1>
        {!!product.descriptionHtml && (
          <div
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml ?? "",
            }}
          />
        )}
        {!!product.variants && (
          <VariantSelector
            priceRange={product.priceRange}
            options={product.options}
            variants={product.variants}
          />
        )}
      </div>
      <AddToCart product={product} />
    </>
  );
}

function ProductImage({
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

async function RelatedProducts({ id, tags }: { id: string; tags: string[] }) {
  const relatedProducts = await getProductRecommendations({
    productId: id,
    tags,
  });

  if (!relatedProducts.length) return null;

  return (
    <div>
      <h2>Related Products</h2>
      <ul className="main-grid">
        {relatedProducts.slice(0, 3).map((product) => (
          <li key={product.handle}>
            <Link href={`/products/${product.handle}`} prefetch={true}>
              <div className="product-card">
                <ProductImage
                  shopifyImage={product.featuredImage}
                  objectFit="contain"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                />
              </div>
              <h3>{product.title}</h3>
              <Price
                amount={product.priceRange.minVariantPrice.amount}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
