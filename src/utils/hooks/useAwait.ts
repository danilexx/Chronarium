import { useBoolean } from "react-use";
import { useCallback } from "react";

const useAwait = <T = any>(
  asyncFn: any
): [
  boolean,
  any,
  {
    toggle: (nextState?: boolean) => void;
  }
] => {
  const [isLoading, toggle] = useBoolean(false);
  // @ts-ignore
  const fetch = async (...args): T => {
    toggle(true);
    const data = await asyncFn(...args);
    toggle(false);
    return data;
  };
  return [
    isLoading,
    fetch,
    {
      toggle
    }
  ];
};

export default useAwait;
