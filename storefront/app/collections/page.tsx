import Link from "next/link";
import NextImage from "next/image";
import { sanityFetch } from "../../data/sanity";
import { ALL_COLLECTIONS_QUERY } from "../../data/sanity/queries";
import s from "./page.module.css";

export default async function Page() {
  // get the syncTags from lcapi so we can revalidate the shopify queries
  const { tags, data: collections } = await sanityFetch({
    query: ALL_COLLECTIONS_QUERY,
  });

  return (
    <section className={s.list}>
      <div className={s.collection}>
        <Link href="/collections/all">
          <div
            style={{ backgroundColor: "black", height: "100%", width: "100%" }}
          />
          <h2>All Collections</h2>
        </Link>
      </div>
      {collections.map((collection) => {
        return (
          <div key={collection._id} className={s.collection}>
            <Link href={`/collections/${collection?.store?.slug?.current}`}>
              <NextImage
                src={collection.store?.imageUrl || ""}
                fill
                alt={`Presentational image for collection: ${collection?.store?.title}`}
                objectFit="contain"
                sizes={"100vw"}
              />
              <h2>{collection?.store?.title}</h2>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
