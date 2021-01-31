import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #404449;
    --blue: #093E47;
    --white: #FFFFFF;
    --grey: #DCE0E2;
    --light-grey: ##e9eef0;
    --light-green: #7D9A64;
    --dark-green: #6A6E4F;
    --red: #96244E;
    --brown: #615400;
  }
  html {
    font-size: 10px;
    overflow: hidden;
  }

  main {
    background-color: var(--light-grey);
    height: 100vh;
    width: 100%;
  }

  aside {
    background-color: var(--dark-green);
    height: 100vh;
    width: 100%;
    border-radius: 15px;
  }

  body {
    font-size: 2rem;
  }

  .gatsby-image-wrapper img[src*="base64\\,"] { // different with Wes
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  hr {
    border: 0;
    height: 8px;
  }

  img {
    max-width: 100%;
  }
`;

export default GlobalStyles;