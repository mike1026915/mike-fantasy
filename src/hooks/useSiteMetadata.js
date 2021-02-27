import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            contacts {
              email
              github
              instagram
              linkedin
            }
            copyright
            description
            intro
            menus {
              label
              path
            }
            name
            siteUrl
            title
            url
          }
        }
        file(relativePath: {eq: "Mike.jpg"}) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );

  return {
    siteMetadata: site.siteMetadata,
    profilePicture: file.childImageSharp.fluid,
  }
};

export default useSiteMetadata;
