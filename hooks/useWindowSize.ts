import { useEffect, useState } from 'react';

interface UseWindowSizeOptions {
  window?: Window;
  initialWidth?: number;
  initialHeight?: number;
  listenOrientation?: boolean;
  includeScrollbar?: boolean;
}

export function useWindowSize(options: UseWindowSizeOptions = {}) {
  const {
    window: defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true,
  } = options;

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  const update = () => {
    const windowObj = defaultWindow || window;
    if (windowObj) {
      if (includeScrollbar) {
        setWidth(windowObj.innerWidth);
        setHeight(windowObj.innerHeight);
      } else {
        setWidth(windowObj.document.documentElement.clientWidth);
        setHeight(windowObj.document.documentElement.clientHeight);
      }
    }
  };

  useEffect(() => {
    update();
    const handleResize = () => {
      update();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [includeScrollbar, defaultWindow]);

  if (listenOrientation) {
    const mediaQuery = window.matchMedia('(orientation: portrait)');
    const handleOrientationChange = () => {
      update();
    };

    mediaQuery.addEventListener('change', handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }

  return { width, height };
}
