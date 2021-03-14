import React from "react";
import ReactPlayer from "react-player";
import Container from "./container";
import classNames from 'classnames';

import styles from "./project.module.css";
import { responsiveTitle1, responsiveTitle2, paragraph } from "../components/typography.module.css";

function Project(props) {
  const { id, title, slug, publishedAt, videoUrl, excerpt, contributors } = props;

  return (
    <article className={styles.root}>
      <Container>
        <div className={styles.videoContainer}>
          <ReactPlayer
            className={styles.reactPlayer}
            url={videoUrl}
            controls
            playsinline
            width="100%"
            height="100%"
          />
        </div>
        <h1 className={classNames(responsiveTitle1, styles.header)}>{title}</h1>
        <p className={classNames(responsiveTitle2, styles.excerpt)}>{excerpt}</p>
        <div className={styles.contributorsContainer}>
          {contributors &&
            contributors.length > 0 &&
            contributors.map((contributor) => (
              <span key={contributor._key} className={classNames(paragraph, styles.contributorBlock)}>
                {`${contributor.role.title} - ${contributor.contributors}`}
              </span>
            ))}
        </div>
      </Container>
    </article>
  );
}

export default Project;
