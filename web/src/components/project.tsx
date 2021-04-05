import React from 'react';
import ReactPlayer from 'react-player';
import Container from './container';
import classNames from 'classnames';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';

import {
  root,
  header,
  excerpt as excerptStyle,
  contributorsContainer,
  contributorBlock,
  videoContainer,
  reactPlayer,
  imageGrid,
} from './project.module.css';
import { title1 } from '../components/typography.module.css';

function Project(props) {
  const { id, title, slug, publishedAt, videoUrl, excerpt, contributors } = props;
  const images: Array<any> = props.image;

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
    <SimpleReactLightbox>
      <Container>
        <article className={root}>
          {title && <h1 className={classNames(title1, header)}>{title}</h1>}
          {excerpt && <p className={excerptStyle}>{excerpt}</p>}

          {videoUrl && (
            <div className={videoContainer}>
              <ReactPlayer
                className={reactPlayer}
                url={videoUrl}
                controls
                playsinline
                width="100%"
                height="100%"
              />
            </div>
          )}

          {images && images.length > 0 && (
            <SRLWrapper options={lightboxOptions}>
              <div className={imageGrid}>
                {images.map((image) => (
                  <div>
                    <a key={image._key} href={imageUrlFor(buildImageObj(image)).url()}>
                      <img
                        src={imageUrlFor(buildImageObj(image)).width(500).height(500).url()}
                        alt={image.alt}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </SRLWrapper>
          )}

          {contributors && contributors.length > 0 && (
            <div className={contributorsContainer}>
              {contributors.map((contributor) => {
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
                return (
                  <span key={contributor._key} className={contributorBlock}>
                    {`${contributor.role.title} - ${contributorString}`}
                  </span>
                );
              })}
            </div>
          )}
        </article>
      </Container>
    </SimpleReactLightbox>
  );
}

export default Project;
