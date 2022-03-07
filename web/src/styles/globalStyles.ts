import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    font-family: var(--font-family-chalet);
    font-size: var(--font-base-size);
    line-height: var(--font-base-line-height);
  }

  body {
    background: ${theme.palette.backgroundColor};
    color: ${theme.palette.textColor};
    margin: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  html,
  body,
  body > div#___gatsby,
  body > div#___gatsby > div {
    height: 100%;
  }
`;

export default GlobalStyle;
