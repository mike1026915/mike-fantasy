const path = require('path')

exports.createPages = async ({graphql, actions}) => {
    const blogPost = path.resolve(`./src/components/blog/BlogPost.js`)
    const { data } = await graphql(`
        query {
            allMdx(filter: {frontmatter: {draft: {eq: false}}}) {
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

    posts.forEach((post, index) => {
        const previous = (index === posts.length - 1) ? null : posts[index + 1].node
        const next = (index === 0) ? null : posts[index - 1].node
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