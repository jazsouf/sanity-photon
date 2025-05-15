import NextImage from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import Price from "../../components/price";
import { sanityFetch } from "../../data/sanity";
import { ALL_PRODUCTS_QUERY } from "../../data/sanity/queries";
import { getProducts } from "../../data/shopify";

export default async function Page() {
  // get the syncTags from lcapi so we can revalidate the shopify queries
  const { tags } = await sanityFetch({ query: ALL_PRODUCTS_QUERY });

  const products = await getProducts({ tags });

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
