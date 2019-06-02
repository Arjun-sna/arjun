import React from "react"
import Layout from '../components/layout';
import { Link, graphql } from "gatsby"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(posts)

    return (
      <Layout>
        {
          posts.map(({ node }) => {
            const { excerpt, frontmatter: { title, date }} = node;
            
            return (
              <article>
                <span className="meta">
                  { date }
                </span>
                <Link><h1>{ title }</h1></Link>
                <p>
                  { excerpt }
                  <Link className="read-more" href="/">Read  →</Link>
                </p>
              </article>
            )
          })
        }
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
