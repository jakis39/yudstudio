import { format } from "date-fns";

export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "clientName",
      title: "Client",
      type: "string"
      // validation: Rule => Rule.required()
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        'Will show up in the url as yudstudio.com/work/<slug>. Feel free to just click "Generate".',
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description:
        "You can set this to a date in the future if you don't want this project to appear on the site until later. Otherwise feel free to leave it as is. It won't appear on the site.",
      validation: Rule => Rule.required()
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url"
    },
    {
      name: "headerImage",
      title: "Header image",
      type: "figure"
    },
    {
      name: "image",
      title: "Photos",
      type: "array",
      of: [{ type: "gridFigure" }],
      description: 'Drag photos here or click "Add" to upload one.'
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Write a blurb the project here"
    },
    {
      name: "contributors",
      title: "Contributors",
      type: "array",
      of: [{ type: "projectContributor" }],
      description: "List team members that worked on the project here."
    },
    {
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      of: [{ type: "reference", to: { type: "project" } }]
    }
  ],
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      slug: "slug"
    },
    prepare({ title = "No title", publishedAt, slug = {} }) {
      // const dateSegment = format(publishedAt, 'YYYY/MM')
      // const path = `/${dateSegment}/${slug.current}/`
      const path = `/work/${slug.current}/`;
      return {
        title,
        subtitle: path
      };
    }
  }
};
