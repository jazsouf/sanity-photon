import "../styles/globals.css";

import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { Toaster } from "sonner";

import { DraftModeToast } from "./draft-mode-toast";

import { sanityFetch, SanityLive } from "../data/sanity";
import { HOME_QUERY, SETTINGS_QUERY } from "../data/sanity/queries";
import { resolveOpenGraphImage } from "../sanity/utils";
import { handleError } from "./client-utils";

import SanityLink from "../components/sanity-link";

import Newsletter from "../components/newsletter";
import { CartProvider } from "./_cart/cart-context";
import { LocalCart } from "./_cart/local-cart";
import s from "./layout.module.css";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: home }] = await Promise.all([
    sanityFetch({
      query: SETTINGS_QUERY,
      // Metadata should never contain stega
      stega: false,
    }),
    sanityFetch({
      query: HOME_QUERY,
      // Metadata should never contain stega
      stega: false,
    }),
  ]);
  const title = settings?.title || "Sanity Photon";
  const description =
    home?.pageSeo?.description || "An E-commerce starter by Soufiane @jazsouf";

  const ogImage = resolveOpenGraphImage(home?.pageSeo?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.metadataBase
      ? new URL(settings.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <body>
        {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
            <VisualEditing />
          </>
        )}
        {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
        <SanityLive onError={handleError} />
        {/* We'll keep a static store to demonstrate functionality. For a complete e-commerce solution, the cart should have server state in the form of cookies */}
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

export async function Header() {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  const header = settings?.header;

  return (
    <header className={s.header}>
      <div className={s.annoucementBar}>
        {header?.announcementBar?.link?.url ? (
          <SanityLink link={header?.announcementBar?.link}>
            {header?.announcementBar?.content}
          </SanityLink>
        ) : (
          <div>{header?.announcementBar?.content}</div>
        )}
      </div>
      <nav className={s.nav}>
        <ul role="list" className={s.menu}>
          {header?.links?.map((link) => {
            return (
              <li key={link._key}>
                <SanityLink link={link}>{link.label}</SanityLink>
              </li>
            );
          })}

          <li>
            <LocalCart />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export async function Footer() {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  const footer = settings?.footer;

  return (
    <footer className={s.footer}>
      <h3>Built with Sanity + Next.js.</h3>
      <ul role="list">
        {footer?.links?.map((link) => {
          return (
            <li key={link._key}>
              <SanityLink link={link}>{link.label}</SanityLink>
            </li>
          );
        })}
      </ul>
      <Newsletter />
    </footer>
  );
}
