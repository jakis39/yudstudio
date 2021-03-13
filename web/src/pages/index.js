import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import classNames from 'classnames';

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
  }
`;

import styles from "./index.module.css";
import { title1, title3 } from "../components/typography.module.css";

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container wide short grow>
        <div className={styles.wrapper}>
          <h1 className={classNames(title1, styles.title)}>{site.description}</h1>
          <div className={classNames(title3, styles.contactBox)}>
            <span>INQUIRE:</span>
            <span><a href="https://www.instagram.com/yud_studio/">@yudstudio</a></span>
            <span><a href="mailto:info@yudstudio.com">info@yudstudio.com</a></span>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
