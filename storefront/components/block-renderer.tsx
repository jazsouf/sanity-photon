import React from "react";
import { dataAttr } from "../sanity/utils";
import { EditorialBlock } from "./editorial-block";
import Newsletter from "./newsletter";
type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _key: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
  pageId: string;
  pageType: string;
};

const Blocks: BlocksType = {
  editorialBlock: EditorialBlock,
  newletter: Newsletter,
  // callToAction: Cta,
  // other blocks types
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export function BlockRenderer({ block, index, pageId, pageType }: BlockProps) {
  // Block does exist

  if (typeof Blocks[block._type] !== "undefined") {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div>A &ldquo;{block._type}&rdquo; block hasn&apos;t been created</div>
    ),
    { key: block._key },
  );
}
