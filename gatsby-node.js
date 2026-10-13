const path = require('path')

exports.createPages = async ({graphql, actions}) => {
    const blogPost = path.resolve(`./src/components/blog/BlogPost.js`)
    const { data } = await graphql(`
        query {
            allMdx(filter: {frontmatter: {draft: {eq: false}}}, sort: { fields: [frontmatter___date], order: DESC }) {
                nodes {
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
        }
    `)

    const posts = data.allMdx.nodes;

    const toLink = (post) => (post ? {
        slug: post.frontmatter.slug,
        title: post.frontmatter.title,
    } : null)

    // Posts are sorted newest first: the neighbour at index + 1 is the older post.
    posts.forEach((post, index) => {
        const previous = toLink(posts[index + 1])
        const next = toLink(posts[index - 1])
        const {
            frontmatter,
        } = post;
        const {
            slug,
        } = frontmatter;

        actions.createPage({
            path: `/blogs/${slug}`,
            component: blogPost,
            context: {
                slug,
                previous,
                next,
            },
        });
    })
}