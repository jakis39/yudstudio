import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const DEBOUNCE_TIME = 200;

function getWindowDimensions() {
  let width;
  let height;
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    const { innerWidth, innerHeight } = window;
    width = innerWidth;
    height = innerHeight;
  }

  return {
    width,
    height,
  };
}

export interface useWindowDimensionsProps {
  debounce?: boolean;
  debounceTime?: number;
}

export default function useWindowDimensions(props?: useWindowDimensionsProps) {
  const { debounce: shouldDebounce, debounceTime: userDebounceTime } = props;
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const debounceTime = userDebounceTime ?? DEBOUNCE_TIME;

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    if (shouldDebounce) {
      const debouncedResize = debounce(handleResize, debounceTime, {
        leading: false,
        trailing: true,
      });
      window.addEventListener('resize', debouncedResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () =>
      window.removeEventListener('resize', shouldDebounce ? debouncedResize : handleResize);
  }, []);

  return windowDimensions;
}
