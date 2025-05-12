import { defineArrayMember, defineField, defineType } from "sanity";

export const editorialBlock = defineType({
  name: "editorialBlock",
  title: "Block",
  type: "object",
  fields: [
    defineField({
      name: "cover",
      title: "Cover",
      description:
        "Add an image or a color as a background color to your block. Required.",
      type: "array",
      of: [
        defineArrayMember({ type: "picture" }),
        defineArrayMember({ type: "color" }),
      ],
      validation: (Rule) => Rule.max(1).required(),
    }),
    defineField({
      name: "textColor",
      type: "color",
      description: "Set the color of the text in your block. Default is black.",
      hidden: ({ parent }) => {
        const hasContent = parent?.content;
        return !hasContent;
      },
    }),
    defineField({
      name: "content",
      type: "blockContent",
      description: "Add content to your block. Optional.",
    }),
  ],
  preview: {
    select: {
      cover: "cover",
    },
    prepare({ cover }) {
      let blockType = "";
      if (cover[0]?._type === "picture") {
        blockType = "Image";
      }
      if (cover[0]?._type === "color") {
        blockType = "Color";
      }

      return {
        title: `${blockType} Block`,
        media:
          blockType === "Image" ? (
            cover[0]
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: `${cover[0]?.hex}`,
                border: "1px #fff9 solid",
              }}
            />
          ),
      };
    },
  },
});
