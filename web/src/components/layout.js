import React from 'react';
import classNames from 'classnames';
import Container from './container';
import Header from './header';
import Navigation from './navigation';

import '../styles/layout.css';
import * as styles from './layout.module.css';

const footerText = '© 2021 YUD STUDIO';

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, centered = false }) => {
  return (
    <div className={styles.pageWrapper}>
      <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />

      <div className={styles.content}>{children}</div>

      <footer className={classNames(styles.footer, { [styles.centeredFooter]: centered })}>
        <Container wide short>
          <Navigation hideWhen="large" />
          <div className={styles.footerText}>{footerText}</div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
