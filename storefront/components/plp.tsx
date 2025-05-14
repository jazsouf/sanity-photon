import { notFound } from "next/navigation";
import { getCollectionProducts, getProducts } from "../data/shopify";
import NextLink from "next/link";
import NextImage from "next/image";
import Price from "./price";

export async function PLP(props: { collectionSlug?: string; tags: string[] }) {
  const { tags, collectionSlug } = props;
  let products;
  if (collectionSlug) {
    products = await getCollectionProducts({
      collection: collectionSlug,
      tags,
    });
  } else {
    products = await getProducts({ tags });
  }

  if (!products) {
    return notFound();
  }

  return (
    <div className="block-space">
      <div className="main-grid">
        {products.map((product) => {
          return (
            <article key={product.id}>
              <NextLink href={`/products/${product.handle}`}>
                <div className="product-card">
                  <NextImage
                    src={product.featuredImage.url || ""}
                    fill
                    alt={`Image for product: ${product.title}`}
                    objectFit="cover"
                    sizes={"33vw"}
                  />
                </div>
                <h2>{product.title}</h2>
                <p>
                  <Price
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={
                      product.priceRange.maxVariantPrice.currencyCode
                    }
                  />
                </p>
              </NextLink>
            </article>
          );
        })}
      </div>
    </div>
  );
}
