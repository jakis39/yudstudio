export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  __experimental_actions: [
    // 'create',
    "update",
    // 'delete',
    "publish"
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "Describe your portfolio for search engines and social media."
    },
    {
      name: "shopText",
      type: "text",
      title: "Shop page text",
      description: 'Message that will display on the "under construction" shop page.'
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: 'This video will be playing in the background on the home/projects page'
    },
    {
      name: "headerImage",
      title: "Header image",
      type: "figure",
      description: 'If there is no video URL above, the home/projects page will try to use this photo as a fallback' 
    },
    {
      name: "contactInfo",
      title: "Contact Info",
      type: "contactInfo"
    },
    {
      name: "keywords",
      type: "array",
      title: "Keywords",
      description: "Add keywords that describes your portfolio.",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    },
    {
      name: "author",
      type: "reference",
      description: "Publish an author and set a reference to them here.",
      title: "Author",
      to: [{ type: "person" }]
    }
  ]
};
