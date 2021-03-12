export default {
    name: 'role',
    type: 'document',
    title: 'Role',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description: 'Optional'
      }
    ]
  }
  