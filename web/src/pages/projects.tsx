import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPillGrid from '../components/project-pill-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {mapEdgesToNodes, filterOutDocsWithoutSlugs} from '../lib/helpers'

import {responsiveTitle1} from '../components/typography.module.css'

export const query = graphql`
  query ProjectsPageQuery {
    projects: allSanityProject(
      limit: 100
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          videoUrl
        }
      }
    }
  }
`

const ProjectsPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
  return (
    <Layout>
      <SEO title='Projects' />
      {/* <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}> */}
        <Container wide short>
          <div style={{ height: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <h1 hidden className={responsiveTitle1}>Work</h1>
            {projectNodes && projectNodes.length > 0 && <ProjectPillGrid projects={projectNodes} />}
          </div>
        </Container>
      {/* </div> */}
    </Layout>
  )
}

export default ProjectsPage
