import React from "react";
import { useMeasure } from "react-use";

interface OnResize {
  (height: number): void;
}

const useOnResize = (onResize: OnResize) => {
  const [ref, { height }] = useMeasure();
  React.useEffect(() => {
    onResize(height);
  }, [height]);
  return ref;
};

export default useOnResize;
