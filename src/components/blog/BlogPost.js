import React from 'react'
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components';

import Layout from '../Layout';
import SEO from '../SEO';

const StyledPager = styled.nav`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`

const StyledMetadata = styled.div`
    display: flex;
    border-bottom: solid;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
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
        const {
            previous,
            next,
        } = pageContext;
        const {
            name: authorName,
            siteUrl,
        } = site.siteMetadata;
        const {
            body,
            timeToRead,
            wordCount,
            frontmatter,
        } = mdx
        const totalWords = wordCount.words;
        const {
            date,
            isoDate,
            description,
            slug,
            tags,
            title,
        } = frontmatter;

        return (
            <Layout>
                <SEO
                    title={title}
                    description={description}
                    pathname={`/blogs/${slug}/`}
                    ogType="article"
                    jsonLd={{
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: title,
                        description,
                        datePublished: isoDate,
                        keywords: tags,
                        url: `${siteUrl}/blogs/${slug}/`,
                        author: {
                            '@type': 'Person',
                            name: authorName,
                            url: siteUrl,
                        },
                    }}
                />
                <h1>{title}</h1>
                <StyledMetadata>
                    <p>
                        {date},
                    </p>
                    <p> {timeToRead} minute to read </p>
                </StyledMetadata>


                <MDXRenderer>{body}</MDXRenderer>
                <hr/>
                <StyledPager>
                    <div>
                        {previous && (
                            <Link to={`/blogs/${previous.slug}`} rel="prev">
                                ← {previous.title}
                            </Link>
                        )}
                    </div>
                    <div>
                        {next && (
                            <Link to={`/blogs/${next.slug}`} rel="next">
                                {next.title} →
                            </Link>
                        )}
                    </div>
                </StyledPager>
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
                siteUrl
            }
        }
        mdx(frontmatter: {draft: {eq: false}, slug: {eq: $slug}}) {
            body
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                isoDate: date
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