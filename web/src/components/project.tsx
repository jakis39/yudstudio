import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import { Link } from 'gatsby';
import SimpleReactLightbox from 'simple-react-lightbox';
import { DeviceWidth } from '../styles/mediaQueries';

import { font } from '../styles/typography';
import { theme } from '../styles/theme';

import Container from './container';
import PhotoGrid from './photo-grid';
import ResponsiveVideoContainer, { VideoContainer } from './ResponsiveVideoContainer';
import VideoGrid from './video-grid';

import ArrowRight from '../images/arrow-right.svg';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export interface ProjectProps {
  project: any;
  linkToPrevious?: string;
  linkToNext?: string;
}

function Project(props: ProjectProps) {
  const { project, linkToPrevious, linkToNext } = props;
  const {
    clientName,
    clientLogo,
    projectDate,
    title,
    videoUrl,
    headerImage,
    additionalVideoUrls,
    excerpt,
    contributors,
  } = project;
  const images: Array<any> = project.image;

  let headerVideo = videoUrl;

  if ((!images || images.length === 0) && !videoUrl && additionalVideoUrls.length) {
    const randomIndex = Math.floor(Math.random() * additionalVideoUrls.length);
    headerVideo = additionalVideoUrls[randomIndex];
  }

  function generateContributorString(contributor) {
    let contributorString = '';
    if (contributor.people?.length) {
      contributorString = contributor.people.reduce((list, person, index) => {
        if (person.name) {
          return list.length === 0 ? person.name : `${list}, ${person.name}`;
        } else {
          return '';
        }
      }, '');
    }
    if (contributor.contributors) {
      contributorString =
        contributorString.length > 0
          ? `${contributorString}, ${contributor.contributors}`
          : contributor.contributors;
    }
    return contributorString;
  }

  const titleBlock = (
    <TitleContainer>
      {clientName && <Client>{clientName}</Client>}
      {title && <Title>{title}</Title>}
      {projectDate && <Year>{projectDate}</Year>}
    </TitleContainer>
  );

  const contributorRefs = useRef([]);
  const dividerRefs = useRef([]);

  function addToContributorRefs(element) {
    if (element && !contributorRefs.current.includes(element)) {
      contributorRefs.current.push(element);
    }
  }

  function addToDividerRefs(element) {
    if (element && !dividerRefs.current.includes(element)) {
      dividerRefs.current.push(element);
    }
  }

  useEffect(() => {
    const scrollTrigger = (ref, index) => ({
      id: `section-${index + 1}`,
      trigger: ref,
      start: 'top bottom',
      toggleActions: 'play',
    });

    contributorRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'none',
          // delay: (index + 1) * 0.2,
          scrollTrigger: scrollTrigger(ref, index),
        }
      );
    });

    dividerRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        {
          transform: 'translateX(-100%)',
        },
        {
          transform: 'translateX(0)',
          duration: 0.4,
          ease: 'none',
          // delay: (index + 1) * 0.2,
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
          duration: 0.3,
          ease: 'none',
          // delay: (index + 1) * 0.2,
          scrollTrigger: scrollTrigger(ref, index),
        }
      );
    });
  }, [contributorRefs, dividerRefs]);

  return (
    <article id="scrollable">
      <SimpleReactLightbox>
        {headerVideo && (
          <ResponsiveVideoContainer videoUrl={headerVideo}>{titleBlock}</ResponsiveVideoContainer>
        )}

        {!videoUrl && headerImage && (
          <MainPhotoContainer>
            <img src={imageUrlFor(buildImageObj(headerImage)).url()} alt={headerImage.alt} />
            {titleBlock}
          </MainPhotoContainer>
        )}

        <TopContent>
          {clientLogo && (
            <LogoContainer>
              <img src={imageUrlFor(buildImageObj(clientLogo)).url()} alt={clientLogo.alt} />
            </LogoContainer>
          )}
          {excerpt && <Description addSpacing={clientLogo && excerpt}>{excerpt}</Description>}
        </TopContent>

        {additionalVideoUrls && <VideoGrid urls={additionalVideoUrls} />}

        {images && <PhotoGrid images={images} />}

        <BottomContentContainer wide short>
          <StyledDL>
            {contributors &&
              contributors.length > 0 &&
              contributors.map((contributor) => {
                let contributorString = generateContributorString(contributor);
                return (
                  <div key={contributor._key}>
                    <ContributorRow ref={addToContributorRefs}>
                      <dt>{contributor.role.title}</dt>
                      <dd>{contributorString}</dd>
                    </ContributorRow>
                    <Divider ref={addToDividerRefs} />
                  </div>
                );
              })}
          </StyledDL>

          <ButtonRow>
            {linkToPrevious && (
              <PreviousLink to={linkToPrevious}>
                <img src={ArrowRight} />
                Previous
              </PreviousLink>
            )}
            {linkToNext && (
              <NextLink to={linkToNext}>
                Next
                <img src={ArrowRight} />
              </NextLink>
            )}
          </ButtonRow>
        </BottomContentContainer>
      </SimpleReactLightbox>
    </article>
  );
}

export default Project;

const MainPhotoContainer = styled(VideoContainer)`
  display: flex;
  padding: 0;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: ${theme.space(7.5)};
  left: ${theme.space(9)};
  color: ${theme.colors.white};
  max-width: 70%;

  @media (${DeviceWidth.mediaMaxSmall}) {
    left: ${theme.space(4)};
    bottom: ${theme.space(3)};
  }
`;

const Year = styled.div`
  ${font('body18')}
  margin-top: ${theme.space(2)};

  @media (${DeviceWidth.mediaMaxSmall}) {
    margin-top: ${theme.space(1)};
  }
`;

const Client = styled.h1`
  ${font('title48')}
  margin: 0;
`;

const Title = styled.h2`
  ${font('body24')};
  margin: 0;
`;

const TopContent = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: ${theme.space(20)} 0;

  @media (${DeviceWidth.mediaMaxMedium}) {
    flex-direction: column;
    padding: ${theme.space(10)} 0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20vw;
    max-height: 100px;
    object-fit: contain;
  }
`;

const Description = styled.div<{ addSpacing: boolean }>`
  ${font('body24')};

  ${({ addSpacing }) =>
    addSpacing &&
    css`
      @media (${DeviceWidth.mediaMaxMedium}) {
        margin-top: ${theme.space(8)};
      }
      @media (${DeviceWidth.mediaMinMedium}) {
        margin-left: 15%;
      }
    `}
`;

const BottomContentContainer = styled(Container)`
  padding-top: ${theme.space(22)};

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding-top: ${theme.space(10)};
  }
`;

const StyledDL = styled.dl`
  margin: 0;
  overflow: hidden;
`;

const Row = styled.div`
  ${font('interface20')};
  display: flex;
  color: ${theme.colors.black};
  padding: ${theme.space(1)} 0;

  @media (${DeviceWidth.mediaMinSmall}) {
    padding: ${theme.space(4)} ${theme.space(3)};
  }
`;

const ContributorRow = styled(Row)`
  @media (${DeviceWidth.mediaMinSmall}) {
    border-width: 2px;
  }

  dt {
    flex: 0 1 40%;
  }
  dd {
    flex: 1;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${theme.colors.black};

  @media (${DeviceWidth.mediaMinSmall}) {
    height: 2px;
  }
`;

const ButtonRow = styled(Row)`
  justify-content: space-between;
  padding: ${theme.space(4)} 0;
`;

const LinkStyles = css`
  ${font('interface20')};
  color: ${theme.colors.black};
  background: none;
  border: none;

  @media (hover: hover) {
    opacity: 70%;

    &:hover {
      opacity: 100%;
    }
  }

  img {
    width: ${theme.space(2)};
    margin: 0 0 0 ${theme.space(2)};

    @media (${DeviceWidth.mediaMinSmall}) {
      width: ${theme.space(3)};
      margin: 0 0 0 ${theme.space(3)};
    }
  }
`;

const PreviousLink = styled(Link)`
  ${LinkStyles}

  img {
    transform: rotate(180deg);
    margin: 0 ${theme.space(2)} 0 0;

    @media (${DeviceWidth.mediaMinSmall}) {
      margin: 0 ${theme.space(3)} 0 0;
    }
  }
`;

const NextLink = styled(Link)`
  ${LinkStyles}
  margin-left: auto;
`;
