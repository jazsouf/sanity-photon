import type { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import { sanityFetch } from "../../../data/sanity";
import {
  ALL_COLLECTION_PAGES_SLUGS,
  ALL_COLLECTIONS_QUERY,
  COLLECTION_QUERY,
} from "../../../data/sanity/queries";
import { PageBuilder } from "../../../components/page-builder";
import { resolveOpenGraphImage } from "../../../sanity/utils";
import { PLP } from "../../../components/plp";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: ALL_COLLECTION_PAGES_SLUGS,
    // // Use the published perspective in generateStaticParams
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
  const { data: collection } = await sanityFetch({
    query: COLLECTION_QUERY,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(collection?.store?.imageUrl);

  return {
    title: collection?.store?.title,
    description: collection?.store?.descriptionHtml,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { data: collectionPage, tags } = await sanityFetch({
    query: COLLECTION_QUERY,
    params,
  });

  if (!collectionPage?._id) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{collectionPage.name}</title>
      </Head>
      {!!collectionPage.editorial && (
        <PageBuilder page={collectionPage.editorial} />
      )}
      <PLP tags={tags} collectionSlug={collectionPage.store?.slug?.current} />
    </>
  );
}
