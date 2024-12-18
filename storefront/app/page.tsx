import Head from "next/head";
import { PageBuilder } from "../components/page-builder";
import { sanityFetch } from "../data/sanity/";
import { HOME_QUERY } from "../data/sanity/queries";

export default async function Page() {
  const { data: home } = await sanityFetch({
    query: HOME_QUERY,
    // Metadata should never contain stega
    stega: false,
  });

  if (!home?._id) {
    return <>NO HOME PAGE FOUND</>;
  }

  return (
    <div>
      <Head>
        <title>{home.name}</title>
      </Head>
      <PageBuilder page={home} />
    </div>
  );
}
