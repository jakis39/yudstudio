import { createGlobalStyle, css } from 'styled-components';
import { DeviceWidth } from './mediaQueries';

import MaisonNeue2 from '../assets/MaisonNeueExtendedWEB-Medium.woff2';
import MaisonNeue from '../assets/MaisonNeueExtendedWEB-Medium.woff';

import Chalet from '../assets/Chalet-LondonNineteenSixty.otf';

const globalFonts = css`
  :root {
    @font-face {
      font-family: 'Maison Neue';
      src: url(${MaisonNeue2}) format('woff2'), url(${MaisonNeue}) format('woff');
    }

    @font-face {
      font-family: 'Chalet';
      src: url(${Chalet}) format('opentype');
    }

    --font-family-maison-neue: 'Maison Neue', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-family-chalet: 'Chalet', -apple-system, BlinkMacSystemFont, sans-serif;

    --unit: 16;

    --font-base-size: 1em; /* 16px */
    --font-base-line-height: calc(24 / var(--unit)); /* 24px */

    --font-interface18-size: calc(18 / var(--unit) * 1rem); /* 18px */
    --font-interface18-line-height: calc(18 / 18);

    --font-interface20-size: calc(20 / var(--unit) * 1rem); /* 20px */
    --font-interface20-line-height: calc(20 / 20);

    --font-body18-size: calc(18 / var(--unit) * 1rem); /* 18px */
    --font-body18-line-height: calc(18 / 18);

    --font-body20-size: calc(20 / var(--unit) * 1rem); /* 20px */
    --font-body20-line-height: calc(24 / 20);

    --font-body24-size: calc(24 / var(--unit) * 1rem); /* 24px */
    --font-body24-line-height: calc(32 / 24);

    --font-title24-size: calc(24 / var(--unit) * 1rem); /* 24px */
    --font-title24-line-height: calc(32 / 24);

    --font-title48-size: calc(48 / var(--unit) * 1rem); /* 48px */
    --font-title48-line-height: calc(64 / 48);

    @media (${DeviceWidth.mediaMaxSmall}) {
      --font-base-size: 1em; /* 16px */
      --font-base-line-height: calc(24 / var(--unit)); /* 24px */

      --font-interface18-size: calc(14 / var(--unit) * 1rem); /* 18px */
      --font-interface18-line-height: calc(14 / 14);

      --font-interface20-size: calc(13 / var(--unit) * 1rem); /* 20px */
      --font-interface20-line-height: calc(13 / 13);

      --font-body18-size: calc(10 / var(--unit) * 1rem); /* 18px */
      --font-body18-line-height: calc(18 / 18);

      --font-body20-size: calc(14 / var(--unit) * 1rem); /* 20px */
      --font-body20-line-height: calc(24 / 20);

      --font-body24-size: calc(12 / var(--unit) * 1rem); /* 24px */
      --font-body24-line-height: calc(32 / 24);

      --font-title24-size: calc(18 / var(--unit) * 1rem); /* 24px */
      --font-title24-line-height: calc(32 / 24);

      --font-title48-size: calc(18 / var(--unit) * 1rem); /* 48px */
      --font-title48-line-height: calc(64 / 48);
    }
  }
`;

const GlobalFonts = createGlobalStyle`${globalFonts}`;

export default GlobalFonts;
