import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';
import GraphQLErrorList from '../components/graphql-error-list';
import { DeviceWidth } from '../styles/mediaQueries';
import SEO from '../components/seo';

import { theme } from '../styles/theme';
import { font } from '../styles/typography';

import Container from '../components/container';
import Layout from '../containers/layout';
import ResponsiveVideoContainer from '../components/ResponsiveVideoContainer';

import ArrowRight from '../images/arrow-right.svg';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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

  const containerRef = useRef(null);
  const projectLinksRefs = useRef([]);
  const lineRefs = useRef([]);

  const addToTitleRefs = (element) => {
    if (element && !projectLinksRefs.current.includes(element)) {
      projectLinksRefs.current.push(element);
    }
  };

  const addToLineRefs = (element) => {
    if (element && !lineRefs.current.includes(element)) {
      lineRefs.current.push(element);
    }
  };

  useEffect(() => {
    const scrollTrigger = (ref, index) => ({
      id: `section-${index + 1}`,
      trigger: ref,
      start: 'top bottom',
      toggleActions: 'play',
      once: true,
    });

    projectLinksRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 0.7,
          duration: 0.6,
          ease: 'none',
          delay: (index + 1) * 0.1,
          scrollTrigger: scrollTrigger(ref, index),
          clearProps: 'opacity',
        }
      );
    });

    lineRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        {
          transform: 'translateX(-100%)',
        },
        {
          transform: 'translateX(0)',
          duration: 0.3,
          ease: 'none',
          delay: (index + 1) * 0.1,
          scrollTrigger: scrollTrigger(ref, index),
        }
      );
      gsap.fromTo(
        ref,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.2,
          ease: 'none',
          delay: (index + 1) * 0.1,
          scrollTrigger: scrollTrigger(ref, index),
        }
      );
    });
  }, [projectLinksRefs, lineRefs]);

  return (
    <Layout>
      <div id="scrollable">
        <SEO title="yudstudio" />
        <ResponsiveVideoContainer fullHeight videoUrl={videoUrl} />
        <Container wide short grow>
          {projectNodes && projectNodes.length > 0 && (
            <>
              <Title>Projects</Title>

              <ProjectList ref={containerRef}>
                {projectNodes.map((project) => (
                  <li key={project.slug.current}>
                    <Line ref={addToLineRefs} />
                    <ProjectLink to={`/${project.slug.current}`} ref={addToTitleRefs}>
                      <span>
                        {project.clientName}: {project.title}
                      </span>
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

  > li {
    overflow: hidden;
  }
`;

const Line = styled.div`
  width: 100%;
  border-top: 2px solid ${theme.palette.textColor};
  opacity: 0;

  @media (${DeviceWidth.mediaMaxSmall}) {
    border-width: 1px;
  }
`;

const ProjectLink = styled(Link)`
  ${font('interface20')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.palette.textColor};
  padding: ${theme.space(4)} ${theme.space(3)};
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
