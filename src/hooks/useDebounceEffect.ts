import React from "react";

export const useDebounceEffect = (
  fn: () => void,
  delay: number,
  deps: React.DependencyList,
) => {
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      fn();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, deps);
};
