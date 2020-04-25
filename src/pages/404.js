import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFound = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1 class="page-title">Not Found</h1>
    <p>Sorry, Page not found.</p>
    <p class="error-status">404</p>
  </Layout>
);

export default NotFound;
