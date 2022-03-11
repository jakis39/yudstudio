import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';

import * as htmlToImage from 'html-to-image';
import throttle from 'lodash.throttle';

const THROTTLE_TIME = 500;
const MINIMUM_PAGE_SCROLL = 150;

function getBackgroundPixelColor(): Promise<Uint8ClampedArray> {
  return htmlToImage
    .toCanvas(document.getElementById('pageContent'), {
      pixelRatio: 1,
      backgroundColor: theme.palette.backgroundColor,
    })
    .then(function (canvas) {
      var ctx = canvas.getContext('2d');
      var p = ctx.getImageData(30, window.scrollY + 50, 1, 1).data;
      return p;
    });
}

function getIsColorBright(color: Uint8ClampedArray): boolean {
  return getColorBrightness(color) > 130;
}

function getColorBrightness(color: Uint8ClampedArray): number {
  // https://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
  const [r, g, b, a] = color;
  return Math.sqrt(Math.pow(r, 2) * 0.241 + Math.pow(g, 2) * 0.691 + Math.pow(b, 2) * 0.068);
}

export default function useBackgroundColourLightness() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < MINIMUM_PAGE_SCROLL) {
        setIsDark(true);
      } else {
        getBackgroundPixelColor().then((rgba) => {
          // Check whether the header is over a video pane by
          //  checking if pixel matches video placeholder color
          const [r, g, b] = rgba;
          if (r === 204 && g === 204 && b === 204) {
            setIsDark(true);
          } else {
            setIsDark(!getIsColorBright(rgba));
          }
        });
      }
    };
    const throttledScroll = throttle(handleScroll, THROTTLE_TIME, {
      leading: false,
      trailing: true,
    });
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return isDark;
}
