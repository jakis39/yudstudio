export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6043bdf81d11bb704aada26b',
                  title: 'Sanity Studio',
                  name: 'yudstudio-studio',
                  apiId: '1c7d6c76-c74b-4cc2-bfff-b500630d3815'
                },
                {
                  buildHookId: '6043bdf85caa1448dd9821a5',
                  title: 'Portfolio Website',
                  name: 'yudstudio',
                  apiId: 'cba7bb65-dbbf-4faf-b79b-f34458476c8c'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/jakis39/yudstudio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://yudstudio.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
