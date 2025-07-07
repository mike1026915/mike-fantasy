const dotenv = require('dotenv');

dotenv.config({
    path: '.env',
});

module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: true,
  },
  siteMetadata: {
    title: "Mike Fantasy",
    name: "Mike Fang",
    siteUrl: 'https://www.mike-fang.com',
    description: "Mike Fang 's personal website and blog.",
    url: "https://www.mike-fang.com",
    intro: "Try my best to do right things with right people then enjoy an easy life!",
    copyright: '© All rights reserved.',
    menus: [
      {
        label: 'Resume',
        path: '/'
      },
      {
        label: 'Blog',
        path: '/blogs'
      },
    ],
    contacts: {
      email: 'mailto:mike1026915.cs96@g2.nctu.edu.tw',
      github: 'https://github.com/mike1026915/',
      linkedin: 'https://www.linkedin.com/in/mike1026915/',
      instagram: 'https://www.instagram.com/mike1026915/',
    }
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "./src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/blogs`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        // a workaround to solve mdx-remark plugin compat issue
        // https://github.com/gatsbyjs/gatsby/issues/15486
        plugins: [
          `gatsby-remark-images`,
          `gatsby-remark-prismjs`,
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },

          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    }
  ],
};
