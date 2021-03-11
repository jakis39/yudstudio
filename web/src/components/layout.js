import React from 'react'
import Header from './header'

import '../styles/layout.css'
import styles from './layout.module.css'
import Container from './container'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => (
  <div className={styles.pageWrapper}>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className={styles.content}>{children}</div>

    <footer className={styles.footer}>
      <Container wide short>
        © 2021 YUD STUDIO
      </Container>
    </footer>
    
    {/* <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          © {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a> &amp;
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </div>
      </div>
    </footer> */}
  </div>
)

export default Layout
