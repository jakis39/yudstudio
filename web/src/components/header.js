import { Link } from "gatsby";
import React from "react";
import Icon from "./icon";
import { cn } from "../lib/helpers";

import * as styles from "./header.module.css";

import logo from "../images/yud.png";
import PillButton from "./pill-button";

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className={styles.root}>
    <nav className={cn(styles.nav, showNav && styles.showNav)}>
      <ul>
        <li>
          <PillButton to="/work/" variant="outlined">
            Work
          </PillButton>
        </li>
        <li>
          <PillButton to="/shop/" variant="outlined">
            Shop
          </PillButton>
        </li>
      </ul>
    </nav>

    <div className={styles.wrapper}>
      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button>

      <div className={styles.branding}>
        <Link to="/" className={styles.logo}>
          <img src={logo} />
          {/* <embed src={logo} width="200px" height="100px" type="image/svg+xml" /> */}
        </Link>
      </div>
    </div>
  </div>
);

export default Header;
