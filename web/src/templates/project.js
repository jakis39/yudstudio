import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import Project from '../components/project';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: { eq: $id }) {
      id
      clientName
      clientLogo {
        _key
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
      title
      slug {
        current
      }
      publishedAt
      videoUrl
      excerpt
      contributors {
        _key
        role {
          title
        }
        contributors
        people {
          name
          slug {
            current
          }
        }
      }
      relatedProjects {
        title
        _id
        slug {
          current
        }
      }
      image {
        _key
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
        displayWidth
      }
    }
    projects: allSanityProject(
      limit: 100
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          slug {
            current
          }
        }
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  const { data, errors } = props;
  const project = data && data.project;

  let previousLink;
  let nextLink;

  function findPreviousAndNextLinks(data) {
    const projectNodes =
      data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);

    const currentProjectIndex = projectNodes?.findIndex((node) => node.id === project.id);

    if (currentProjectIndex !== -1) {
      const previousProject = projectNodes[currentProjectIndex - 1];
      const nextProject = projectNodes[currentProjectIndex + 1];

      previousLink = previousProject ? `/work/${previousProject.slug.current}` : undefined;
      nextLink = nextProject ? `/work/${nextProject.slug.current}` : undefined;
    }
  }

  findPreviousAndNextLinks(data);

  return (
    <Layout centered>
      {errors && <SEO title="GraphQL Error" />}
      {project && <SEO title={project.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <Project project={project} linkToPrevious={previousLink} linkToNext={nextLink} />}
    </Layout>
  );
};

export default ProjectTemplate;
