import React from 'react';
import ReactPlayer from 'react-player';
import Container from './container';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';

import logo from '../images/yud-logo-black.png';
import ArrowRight from '../images/arrow-right.svg';

import styled from 'styled-components';
import { font } from '../styles/typography';
import { theme } from '../styles/theme';
import PhotoGrid from './photo-grid';
import { DeviceWidth } from '../styles/mediaQueries';

function Project(props) {
  const { clientName, clientLogo, title, videoUrl, excerpt, contributors } = props;
  const images: Array<any> = props.image;

  function generateContributorString(contributor) {
    let contributorString = '';
    if (contributor.people?.length) {
      contributorString = contributor.people.reduce((list, person, index) => {
        return index === 0 ? person.name : `${list}, ${person.name}`;
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
      <Year>2021</Year>
      {clientName && <Client>{clientName}</Client>}
      {title && <Title>{title}</Title>}
    </TitleContainer>
  );

  return (
    <article>
      <SimpleReactLightbox>
        {videoUrl && (
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
            {titleBlock}
          </VideoContainer>
        )}

        {!videoUrl && images.length && (
          <MainPhotoContainer>
            <img src={imageUrlFor(buildImageObj(images[0])).url()} alt={images[0].alt} />
            {titleBlock}
          </MainPhotoContainer>
        )}

        <LogoContainer>
          {clientLogo && (
            <img src={imageUrlFor(buildImageObj(clientLogo)).url()} alt={clientLogo.alt} />
          )}
        </LogoContainer>

        <PhotoGrid images={images} />

        <BottomContentContainer wide short>
          {excerpt && <Description>{excerpt}</Description>}

          <StyledDL>
            {contributors &&
              contributors.length > 0 &&
              contributors.map((contributor) => {
                let contributorString = generateContributorString(contributor);
                return (
                  <ContributorRow key={contributor._key}>
                    <dt>{contributor.role.title}</dt>
                    <dd>{contributorString}</dd>
                  </ContributorRow>
                );
              })}
          </StyledDL>

          <ButtonRow>
            <Button>
              <img src={ArrowRight} />
              Previous
            </Button>
            <Button>
              Next
              <img src={ArrowRight} />
            </Button>
          </ButtonRow>
        </BottomContentContainer>
      </SimpleReactLightbox>
    </article>
  );
}

export default Project;

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  overflow: hidden;
  box-shadow: 0px 7px 16px 0px #0000004f;

  @media (${DeviceWidth.mediaMaxSmall}) {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

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

  @media (${DeviceWidth.mediaMaxSmall}) {
    left: ${theme.space(4)};
    bottom: ${theme.space(3)};
  }
`;

const Year = styled.div`
  ${font('body24')}
`;

const Client = styled.h1`
  ${font('title48')}
  margin: 0;
`;

const Title = styled.h2`
  ${font('body24')};
  margin: 0;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: ${theme.space(56)};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: ${theme.space(5)};
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    height: ${theme.space(25)};

    img {
      height: 20px;
    }
  }
`;

const BottomContentContainer = styled(Container)`
  padding-top: ${theme.space(21.5)};

  @media (${DeviceWidth.mediaMaxSmall}) {
    padding-top: ${theme.space(7)};
  }
`;

const Description = styled.div`
  ${font('body24')};
  padding-bottom: ${theme.space(7)};

  @media (${DeviceWidth.mediaMinSmall}) {
    padding-bottom: ${theme.space(21.5)};
    max-width: 80%;
    margin: auto;
  }
`;

const StyledDL = styled.dl`
  margin: 0;
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
  border-bottom: 1px solid ${theme.colors.black};

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

const ButtonRow = styled(Row)`
  justify-content: space-between;
  padding: ${theme.space(4)} 0;
`;

const Button = styled.button`
  ${font('interface20')};
  background: none;
  border: none;

  img {
    width: ${theme.space(2)};
    margin: 0 0 0 ${theme.space(2)};

    @media (${DeviceWidth.mediaMinSmall}) {
      width: ${theme.space(3)};
      margin: 0 0 0 ${theme.space(3)};
    }
  }

  &:first-child {
    img {
      transform: rotate(180deg);
      margin: 0 ${theme.space(2)} 0 0;

      @media (${DeviceWidth.mediaMinSmall}) {
        margin: 0 ${theme.space(3)} 0 0;
      }
    }
  }
`;
