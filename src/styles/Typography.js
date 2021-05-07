import { createGlobalStyle } from 'styled-components';

import Sora from '../assets/fonts/Sora-Medium.ttf';
import Montserrat from '../assets/fonts/Montserrat-Medium.ttf';
import Roboto from '../assets/fonts//Roboto-Light.ttf';

const Typography = createGlobalStyle`
  @font-face {
    font-family: Sora;
    src: url(${Sora});
  }
  @font-face {
    font-family: Montserrat;
    src: url(${Montserrat});
  }

  @font-face {
    font-family: Roboto;
    src: url(${Roboto});
  }

  html {
    font-family: 'Sora', 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  main {
    font-weight: 500;
    color: var(--black);
    display: flex;
    flex-direction: column;
  }

  aside {
    font-weight: 500;
    color: var(--grey);
    display: flex;
    flex-direction: column;

    q {
      font-family: 'Montserrat', 'Sora', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-style: italic;
      font-weight: 300;
    }

    a {
      color: var(--grey);
      text-decoration-color: var(--brown);
    }

  }

  p, li {
    margin: 0;
    font-family: 'Roboto', 'Sora', 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: 0.1rem;
    font-size: 1.751rem;
    word-spacing: 0.15rem;
    padding-bottom: 0.5rem;
  }

  h1 {
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }

  h2 {
    font-weight: 500;
    margin: 0;
  }

  h3,h4,h5,h6 {
    font-weight: 300;
    margin: 0;
  }


  mark, .mark {
    background: var(--light-green);
    padding: 0 2px 2px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
  }

  .center {
    text-align: center;
  }

`;

export default Typography;