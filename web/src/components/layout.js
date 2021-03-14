import React from 'react'
import Header from './header'

import '../styles/layout.css'
import * as styles from './layout.module.css'
import Container from './container'
import classNames from 'classnames';

const footerText = '© 2021 YUD STUDIO';

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle, centered = false}) => (
  <div className={styles.pageWrapper}>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className={styles.content}>{children}</div>

    <footer className={classNames(styles.footer, {[styles.centeredFooter]: centered})}>
      {centered && footerText}
      {!centered && (
        <Container wide short>
          {footerText}
        </Container>
      )}
    </footer>
  </div>
)

export default Layout
