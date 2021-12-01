import React from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import styled, { css } from 'styled-components';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import { DeviceWidth } from '../styles/mediaQueries';

export interface PhotoGridProps {
  images: any[];
}

const PhotoGrid = (props: PhotoGridProps) => {
  const { images } = props;

  const lightboxOptions = {
    settings: {
      overlayColor: 'rgba(0, 0, 0, 0.9)',
      lightboxTransitionSpeed: 0.2,
      slideTransitionSpeed: 0.2,
    },
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showThumbnailsButton: false,
      showFullscreenButton: false,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      size: '3rem',
    },
    thumbnails: {
      showThumbnails: false,
    },
  };

  return (
    <SRLWrapper options={lightboxOptions}>
      <GridContainer>
        {images.map((image) => (
          <a key={image._key} href={imageUrlFor(buildImageObj(image)).url()}>
            <img src={imageUrlFor(buildImageObj(image)).url()} alt={image.alt} />
          </a>
        ))}
      </GridContainer>
    </SRLWrapper>
  );
};

export default PhotoGrid;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  a {
    flex: 1 0 49%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  img {
    width: 101%;
    height: 100%;
    object-fit: cover;
  }

  a:nth-child(3n + 1) {
    flex-basis: 100%;
  }
`;
