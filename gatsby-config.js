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
    siteUrl: 'https://mike-fang.com',
    description: "Mike Fang 's personal website and blog.",
    url: "https://mike-fang.com",
    intro: "Try my best to do right things with right people then enjoy an easy life!",
    copyright: '© All rights reserved.',
    menus: [
      {
        label: 'About Me',
        path: '/'
      },
      {
        label: 'Blog',
        path: '/blog'
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
    "gatsby-plugin-offline",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
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
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
};
