import React from "react";
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import BlogPostTitle from "../components/blog/BlogPostTitle";

const PostsBlock = styled.div`
    margin-top: 1.5rem;
`;

const StyledHeader = styled.h1`
    word-spacing: 1rem;
    display: flex;
    border-bottom: 0.2rem solid var(--light-green);
    padding-bottom: 1.5rem;
    margin-bottom: 1rem;
`

export default function BlogPage({data}) {
    const posts = data.allMdx.nodes.filter((p) => (!p.draft)).map((p) => {
        return (
            <BlogPostTitle
                post={p}
            />
        );
    });

    return (
        <Layout>
            <SEO
                subTitle="Blog"
            />
            <StyledHeader>
                {`LOGGER.INFO({ Mike })`}
            </StyledHeader>
            <PostsBlock>
                {posts}
            </PostsBlock>
        </Layout>
    );
}

export const pageQuery = graphql`
    query {
        allMdx(filter: {frontmatter: {draft: {eq: false}}}, sort: { fields: [frontmatter___date], order: DESC }) {
            nodes {
                body
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    tags
                    slug
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
    }
`