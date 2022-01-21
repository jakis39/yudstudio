import React, { useEffect, useRef } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import styled, { css } from 'styled-components';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import { DeviceWidth } from '../styles/mediaQueries';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  const photoRefs = useRef([]);

  const addPhotoRef = (element) => {
    if (element && !photoRefs.current.includes(element)) {
      photoRefs.current.push(element);
    }
  };

  useEffect(() => {
    photoRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.6,
          delay: (index + 1) % 3 === 0 ? 0.4 : 0.2,
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: ref,
            start: 'top center+=100',
            toggleActions: 'play',
          },
        }
      );
    });
  }, [photoRefs]);

  return (
    <SRLWrapper options={lightboxOptions}>
      <GridContainer>
        {images.map((image) => (
          <a key={image._key} href={imageUrlFor(buildImageObj(image)).url()} ref={addPhotoRef}>
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

    @media (${DeviceWidth.mediaMaxSmall}) {
      min-height: 50vh;
    }
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
