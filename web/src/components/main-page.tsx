import React from 'react';
import Container from '../components/container';
import classNames from 'classnames';

import * as styles from './main-page.module.css';
import { title1, body1 } from '../components/typography.module.css';

export interface SiteSettingsContactInfo {
  instagram: string;
  email: string;
}

export interface MainPageProps {
  header?: string;
  contactInfo: SiteSettingsContactInfo;
}

const MainPage = (props) => {
  const { header = '', contactInfo } = props;
  const { instagram, email } = contactInfo ?? {};
  return (
    <Container wide short grow>
      <div className={styles.wrapper}>
        <h1 className={classNames(title1, styles.title)}>{header}</h1>
        {contactInfo && (
          <address className={classNames(body1, styles.contactBox)}>
            <span>INQUIRE:</span>
            {instagram && (
              <span>
                <a href={`https://www.instagram.com/${instagram}/`}>@{instagram}</a>
              </span>
            )}
            {email && (
              <span>
                <a href={`mailto:${email}`}>{email}</a>
              </span>
            )}
          </address>
        )}
      </div>
    </Container>
  );
};

export default MainPage;
