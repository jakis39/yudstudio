import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import Project from '../components/project';
import SEO from '../components/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: { eq: $id }) {
      id
      clientName
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
  }
`;

const ProjectTemplate = (props) => {
  const { data, errors } = props;
  const project = data && data.project;
  return (
    <Layout centered>
      {errors && <SEO title="GraphQL Error" />}
      {project && <SEO title={project.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <Project {...project} />}
    </Layout>
  );
};

export default ProjectTemplate;
