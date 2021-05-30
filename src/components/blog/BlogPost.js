import React from 'react'
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components';

import Layout from '../Layout';
import SEO from '../SEO';

const StyledMetadata = styled.div`
    display: flex;
    border-bottom: solid;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
`
class BlogPost extends React.Component {

    render() {
        const {
            data,
            pageContext,
            location,
        } = this.props;
        const {
            mdx,
            site,
        } = data;
        const authorName = site.siteMetadata.name;
        const {
            body,
            timeToRead,
            wordCount,
            frontmatter,
        } = mdx
        const totalWords = wordCount.words;
        const {
            date,
            description,
            slug,
            tags,
            title,
        } = frontmatter;

        return (
            <Layout>
                <SEO title={title} description={description} />
                <h1>{title}</h1>
                <StyledMetadata>
                    <p>
                        {date},
                    </p>
                    <p> {timeToRead} minute to read </p>
                </StyledMetadata>


                <MDXRenderer>{body}</MDXRenderer>
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
        mdx(frontmatter: {draft: {eq: false}, slug: {eq: $slug}}) {
            body
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                slug
                tags
                draft
                description
            }
            id
            wordCount {
                words
            }
            timeToRead
            slug
            tableOfContents
        }
    }
`