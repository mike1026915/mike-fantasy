import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site, profile, icon } = useStaticQuery(
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
        icon: file(relativePath: {eq: "icon.png"}) {
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
    icon: icon.childImageSharp.fluid,
  }
};

export default useSiteMetadata;
