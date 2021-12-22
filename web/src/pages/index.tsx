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
import { DeviceWidth } from '../styles/mediaQueries';
import ResponsiveVideoContainer from '../components/ResponsiveVideoContainer';

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
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      videoUrl
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

  const videoUrl = data?.site?.videoUrl;

  return (
    <Layout>
      <div id="scrollable">
        <SEO title="yudstudio - Projects" />
        <ResponsiveVideoContainer fullHeight videoUrl={videoUrl} />
        <Container wide short grow>
          {projectNodes && projectNodes.length > 0 && (
            <>
              <Title>Projects</Title>

              <ProjectList>
                {projectNodes.map((project) => (
                  <li key={project.slug.current}>
                    <ProjectLink to={`/${project.slug.current}`}>
                      <span>{project.title}</span>
                      <img src={ArrowRight} />
                    </ProjectLink>
                  </li>
                ))}
              </ProjectList>
            </>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default ProjectsPage;

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
  align-items: center;
  color: ${theme.colors.black};
  padding: ${theme.space(4)} ${theme.space(3)};
  border-top: 2px solid ${theme.colors.black};
  cursor: pointer;

  @media (hover: hover) {
    opacity: 70%;

    &:hover {
      opacity: 100%;
    }
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding: ${theme.space(2.5)} 0;
    border-width: 1px;
  }

  img {
    width: ${theme.space(3)};
    margin-left: ${theme.space(2)};

    @media (${DeviceWidth.mediaMaxSmall}) {
      width: ${theme.space(2)};
    }
  }
`;
