import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../Layout'

class BlogPost extends React.Component {

    render() {
        const post = this.props;
        console.log(this.props.pageContext)

        return (
            <Layout>
                <SEO title={post.frontmatter.title} description={post.excerpt} />
                <h1>{post.frontmatter.title}</h1>
                <p>
                    {post.frontmatter.date}
                </p>
                <MDXRenderer>{post.body}</MDXRenderer>
                <hr/>
            </Layout>
        )
    }
}

export default BlogPost;

export const pageQuery = graphql`
    query($slug: String!) {
        site {
            siteMetadata {
                name
            }
        }
        mdx(slug: { eq: $slug } ) {
            id
            excerpt(pruneLength: 160)
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
            }
            body
            slug
            tableOfContents
            timeToRead
        }
    }
`