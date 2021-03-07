export default {
    type: 'object',
    name: 'projectContributor',
    title: 'Project Contributor',
    fields: [
        // {
        //     title: 'Role',
        //     name: 'role',
        //     type: 'string',
        //     options: {
        //         layout: 'dropdown',
        //         list: [
        //             { title: 'Designer', value: 'designer' },
        //             { title: 'Developer', value: 'developer' },
        //             { title: 'Editor', value: 'editor' },
        //             { title: 'Manager', value: 'manager' }
        //         ]
        //     }
        // },
        {
            title: 'Role',
            name: 'role',
            type: 'reference',
            to: {type: 'role'}
        },
        {
            title: 'Contributors',
            name: 'contributors',
            type: 'string',
            description: 'Type out names here'
        },
        {
            title: 'People',
            name: 'people',
            type: 'array',
            description: 'Or link to People here',
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