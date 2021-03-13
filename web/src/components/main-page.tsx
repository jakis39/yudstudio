import React from "react";
import Container from "../components/container";
import classNames from "classnames";

import styles from "./main-page.module.css";
import { title1, title3 } from "../components/typography.module.css";

export interface MainPageProps {
  header?: string;
}

const MainPage = (props) => {
  const {header = '', } = props;
  return (
    <Container wide short grow>
      <div className={styles.wrapper}>
        <h1 className={classNames(title1, styles.title)}>{header}</h1>
        <address className={classNames(title3, styles.contactBox)}>
          <span>INQUIRE:</span>
          <span>
            <a href="https://www.instagram.com/yud_studio/">@yud_studio</a>
          </span>
          <span>
            <a href="mailto:info@yudstudio.com">info@yudstudio.com</a>
          </span>
        </address>
      </div>
    </Container>
  );
};

export default MainPage;
