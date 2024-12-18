import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";
import { urlForImage } from "../sanity/utils";

interface CoverImageProps {
  image: any;
  priority?: boolean;
}

export function SanityImage(props: CoverImageProps) {
  const { image: source, priority } = props;

  const image = source?.asset?._ref ? (
    <Image
      fill={true}
      alt={stegaClean(source?.alt) || ""}
      src={
        urlForImage(source)
          ?.height(720)
          .width(1280)
          .auto("format")
          .url() as string
      }
      sizes="100vw"
      className="cover"
      priority={priority}
    />
  ) : (
    <div className="full-height" />
  );

  return <div className="relative overflow-hidden full-height">{image}</div>;
}
