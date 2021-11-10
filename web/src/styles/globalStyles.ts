import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: var(--font-family-sans);
    font-size: var(--font-base-size);
    line-height: var(--font-base-line-height);
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    margin: 0;
    overflow-x: hidden;
  }

  html,
  body,
  body > div#___gatsby,
  body > div#___gatsby > div {
    height: 100%;
  }
`;

export default GlobalStyle;
