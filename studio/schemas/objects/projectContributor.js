export default {
    type: 'object',
    name: 'projectContributor',
    title: 'Project Contributor',
    fields: [
        {
            title: 'Role',
            name: 'role',
            type: 'reference',
            description: 'To add a new role, go to the Roles folder and create a new entry.',
            to: {type: 'role'},
            validation: Rule => Rule.required()
        },
        {
            title: 'Contributors',
            name: 'contributors',
            type: 'string',
            description: 'Type names or anything here.',
        },
        {
            title: 'People',
            name: 'people',
            type: 'array',
            description: 'Or you can also link to People here. To add a new Person, go to the People folder and add a new entry.',
            of: [{
                type: 'reference',
                to: { type: 'person' }
            }],
        },
    ],
    preview: {
        select: {
            role: 'role.title',
            contributors: 'contributors',
            // person0Name: 'people.0.name',
            // person1Name: 'people.1.name',
            // person2Name: 'people.2.name',
        },
        // prepare: ({ role, person0Name, person1Name, person2Name } = props) => {
        //     const people = [person0Name, person1Name].filter(Boolean);
        //     const subtitle = people.length > 0 ? `${people.join(', ')}` : ''
        //     const hasMorePeople = Boolean(person2Name);
        //     return {
        //         title: role,
        //         subtitle: hasMorePeople ? `${subtitle}…` : subtitle
        //     }
        // }
        prepare: ({ role, contributors }) => {
            return {
                title: role,
                subtitle: contributors
            }
        }
    }
}