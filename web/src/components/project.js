import React from 'react';
import ReactPlayer from 'react-player';
import Container from './container';
import classNames from 'classnames';

import {
  root,
  header,
  excerpt as excerptStyle,
  contributorsContainer,
  contributorBlock,
  videoContainer,
  reactPlayer,
} from './project.module.css';
import { responsiveTitle1 } from '../components/typography.module.css';

function Project(props) {
  const { id, title, slug, publishedAt, videoUrl, excerpt, contributors } = props;

  return (
    <article className={root}>
      <Container>
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
        {title && <h1 className={classNames(responsiveTitle1, header)}>{title}</h1>}
        {excerpt && <p className={excerptStyle}>{excerpt}</p>}
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
      </Container>
    </article>
  );
}

export default Project;
