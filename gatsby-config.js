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
    description: "Mike's personal website",
    url: "https://mike-fang.com",
    intro: "Try my best to do right things with right people then enjoy a comfortable life!",
    copyright: '© All rights reserved.',
    menu: [
      {
        label: 'About me',
        path: '/'
      },
      {
        label: 'Blog',
        path: '/pages/blog'
      },
      {
        label: 'Contact me',
        path: '/pages/contacts'
      }
    ],
    contact: {
      email: '',
      github: '#',
      rss: '',
      linkedin: '#',
      instagram: '#',
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
