import { MdPerson } from "react-icons/md";

export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Can be used to link directly to a team member\'s page (not implemented at the moment)',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'bioPortableText'
    },
    {
      name: 'instagram',
      type: 'string',
      title: 'Instagram handle',
      description: 'Don\'t include @ symbol',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url'
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
