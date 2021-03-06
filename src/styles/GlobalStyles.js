import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #404449;
    --blue: #093E47;
    --white: #FFFFFF;
    --grey: #DCE0E2;
    --light-grey: #eeeeee;
    --light-green: #7D9A64;
    --dark-green: #6A6E4F;
    --red: #96244E;
    --brown: #615400;
    --side-panel-size: 30vh;
    --side-panel-left-padding: 5%;
    --side-panel-right-padding: 1%;
    --responsive: 100vh;
  }
  html {
    font-size: 10px;
    min-height: 100vh;
    height: 100vh;
    overflow-x: hidden;
  }

  body {
    font-size: 2rem;
    margin: 0;
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