export default {
  name: "gridFigure",
  title: "Image",
  type: "image",
  options: {
    hotspot: true
  },
  fields: [
    {
      name: "displayWidth",
      title: "Layout width",
      type: "string",
      description:
        "Set whether photo should fill the width of the page. Leave as default for automatic layout.",
      options: {
        list: [
          { title: "Default (auto)", value: "auto" },
          { title: "Full width", value: "fullWidth" },
          { title: "Half width", value: "halfWidth" }
        ],
        initialValue: "auto",
        layout: "radio",
        isHighlighted: true
      }
    },
    {
      title: "Caption",
      name: "caption",
      type: "string",
      options: {
        // isHighlighted: true
      }
    },
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      // validation: Rule => Rule.error('You have to fill out the alternative text.').required(),
      description: "Important for SEO and accessiblity.",
      options: {
        // isHighlighted: true
      }
    }
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption"
    }
  }
};
