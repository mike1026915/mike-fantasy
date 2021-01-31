import { createGlobalStyle } from 'styled-components';


const Typography = createGlobalStyle`

  main {
    font-weight: 500;
    color: var(--black);
  }

  aside {
    font-weight: 500;
    color: var(--grey);
  }

  p, li {
    letter-spacing: 0.5px;
  }

  h1 {
    font-weight: bolder;
    margin: 1rem;
  }

  h2 {
    font-weight: bold;
    margin: 0;
  }

  h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  a {
    color: var(--grey);
    text-decoration-color: var(--brown);
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