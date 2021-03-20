import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Container from "../components/container";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container>
      <h1>PAGE NOT FOUND</h1>
    </Container>
  </Layout>
);

export default NotFoundPage;
