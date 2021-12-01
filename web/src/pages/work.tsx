import React from 'react';
import { graphql, Link } from 'gatsby';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import styled from 'styled-components';
import { font } from '../styles/typography';

import Container from '../components/container';
import Layout from '../containers/layout';

import ArrowRight from '../images/arrow-right.svg';
import { theme } from '../styles/theme';
import ReactPlayer from 'react-player';
import { DeviceWidth } from '../styles/mediaQueries';

export const query = graphql`
  query ProjectsPageQuery {
    projects: allSanityProject(
      limit: 100
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          clientName
          title
          slug {
            current
          }
          videoUrl
        }
      }
    }
  }
`;

const ProjectsPage = (props) => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);

  const videoUrl = 'https://vimeo.com/581854936'; // TODO get from sanity

  return (
    <Layout>
      <SEO title="Work" />

      <VideoContainer>
        <ReactPlayer
          style={{ position: 'absolute', top: 0, left: 0 }}
          url={videoUrl}
          // playing={true}
          // controls={true}
          config={{
            vimeo: {
              playerOptions: { background: true, loop: true, responsive: true },
            },
          }}
          playsinline
          width="100%"
          height="100%"
        />
      </VideoContainer>

      <Container wide short grow>
        {projectNodes && projectNodes.length > 0 && (
          <>
            <Title>Projects</Title>

            <ProjectList>
              {projectNodes.map((project) => (
                <li key={project.slug.current}>
                  <ProjectLink to={`/work/${project.slug.current}`}>
                    <span>{project.title}</span>
                    <img src={ArrowRight} />
                  </ProjectLink>
                </li>
              ))}
            </ProjectList>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default ProjectsPage;

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  overflow: hidden;
  box-shadow: 0px 7px 16px 0px #0000004f;
`;

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.h1`
  ${font('title24')};
  margin-top: 2em;
`;

const ProjectList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ProjectLink = styled(Link)`
  ${font('interface20')};
  display: flex;
  justify-content: space-between;
  color: ${theme.colors.black};
  padding: ${theme.space(4)} ${theme.space(3)};
  border-top: 2px solid ${theme.colors.black};
  cursor: pointer;

  img {
    width: ${theme.space(3)};
  }
`;
