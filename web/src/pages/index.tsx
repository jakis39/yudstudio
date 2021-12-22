import React, { useEffect, useState } from 'react';
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
import useWindowDimensions from '../hooks/useWindowDimensions';

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

  const { width: screenWidth } = useWindowDimensions();
  const [videoWidth, setVideoWidth] = useState('100%');

  useEffect(() => {
    const w = screenWidth > 675 ? '100%' : '240%';
    setVideoWidth(w);
  }, [screenWidth]);

  return (
    <Layout>
      <SEO title="yudstudio - work" />

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
          width={videoWidth}
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
    </Layout>
  );
};

export default ProjectsPage;

const VideoContainer = styled.div`
  position: relative;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  overflow: hidden;
  box-shadow: 0px 7px 16px 0px #0000004f;

  @media (${DeviceWidth.mediaMinMedium}) {
    padding-top: 56.25%;
  }

  @media (${DeviceWidth.mediaMaxMedium}) {
    height: 60vh;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    & > div > div > div {
      margin-left: -59%;
    }
  }
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
