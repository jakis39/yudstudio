import { graphql, StaticQuery } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/layout';
import '../styles/global-fonts.css';

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      contactInfo {
        instagram
        email
      }
    }
  }
`;

export interface LayoutContainerProps {
  isDark?: boolean;
  children: any;
}

function LayoutContainer(props: LayoutContainerProps) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          );
        }
        return (
          <Layout {...props} siteTitle={data.site.title} contactInfo={data.site.contactInfo} />
        );
      }}
    />
  );
}

export default LayoutContainer;
