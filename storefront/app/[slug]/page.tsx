import { PageBuilder } from "../../components/page-builder";

import type { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import { sanityFetch } from "../../data/sanity";
import { ALL_PAGES_SLUGS, PAGE_QUERY } from "../../data/sanity/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: ALL_PAGES_SLUGS,
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
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.pageSeo?.description,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { data: page } = await sanityFetch({ query: PAGE_QUERY, params });

  if (!page?._id) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{page.name}</title>
      </Head>
      <PageBuilder page={page} />
    </>
  );
}
