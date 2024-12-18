/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
    PortableText,
    type PortableTextBlock,
    type PortableTextComponents,
} from "next-sanity";

import { ResolvedLink } from "./resolved-link";

export function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        // Add an anchor to the h1
        <h1 className="relative">{children}</h1>
      ),
      h2: ({ children }) => {
        // Add an anchor to the h2
        return <h2 className="relative">{children}</h2>;
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
    },
  };

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  );
}
