import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from '../components/layout';

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
      }
    }
  }
`

const PageTemplate = ({ data }) => {
  const page = data.wpgraphql.page
  return (
    <Layout>
      <SEO title={page.title} />
      <h1 className="page-title" dangerouslySetInnerHTML={{ __html: page.title }} />
      <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
    </Layout>
  )
}

// const PageTemplate = props => {
//   return <pre>{JSON.stringify(props, null, 2)}</pre>
// }

export default PageTemplate
