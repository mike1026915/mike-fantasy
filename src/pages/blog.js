import React from "react";
import styled from 'styled-components';

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import BlogPostTitle from "../components/blog/BlogPostTitle";

const PostsBlock = styled.div`
    margin: 0 auto;
`;

export default function BlogPage({data}) {
    const posts = data.allMdx.nodes.map((p) => {
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
        <PostsBlock>
            {posts}

        </PostsBlock>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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