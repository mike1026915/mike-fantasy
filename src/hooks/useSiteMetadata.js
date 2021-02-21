import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            contact {
              email
              github
              instagram
              linkedin
              rss
            }
            copyright
            description
            intro
            menu {
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

  console.log({
    site,
    file,
  })

  return {
    siteMetadata: site.siteMetadata,
    profilePicture: file.childImageSharp.fluid,
  }
};

export default useSiteMetadata;
