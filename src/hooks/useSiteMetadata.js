import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site, profile, preview } = useStaticQuery(
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
        profile: file(relativePath: {eq: "Mike.jpg"}) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        preview: file(relativePath: {eq: "preview.png"}) {
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
    profilePicture: profile.childImageSharp.fluid,
    preview: preview.childImageSharp.fluid,
  }
};

export default useSiteMetadata;
