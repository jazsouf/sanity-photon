import { PortableTextBlock } from "next-sanity";
import { PAGE_QUERYResult } from "../sanity.types";
import { CustomPortableText } from "./custom-portable-text";
import { SanityImage } from "./sanity-image";

export function EditorialBlock(props: {
  block: NonNullable<NonNullable<PAGE_QUERYResult>["pageBuilder"]>[0];
  index: number;
}) {
  const { cover, content, textColor } = props.block;

  return (
    <>
      <div
        className="editorial-block"
        style={{
          color: textColor,
          backgroundColor: `${cover && cover[0]._type === "color" ? cover[0]?.color : "black"}`,
        }}
      >
        <SanityImage
          image={cover && cover[0].picture}
          priority={props.index === 0}
        />
        {content && (
          <div className="text-content">
            <CustomPortableText value={content as PortableTextBlock[]} />
          </div>
        )}
      </div>
    </>
  );
}
