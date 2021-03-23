import { Link } from 'gatsby';
import React from 'react';

import * as styles from './header.module.css';

import logo from '../images/yud.png';
import Navigation from './navigation';

const Header = () => {
  return (
    <div className={styles.root}>
      <Navigation hideWhen="small" />

      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/">
            <img src={logo} />
            {/* <embed src={logo} width="200px" height="100px" type="image/svg+xml" /> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
