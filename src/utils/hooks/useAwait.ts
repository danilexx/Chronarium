import { useBoolean } from "react-use";
import { useCallback } from "react";

const useAwait = <T>(
  asyncFn: T
): [
  boolean,
  T,
  {
    toggle: (nextState?: boolean) => void;
  }
] => {
  const [isLoading, toggle] = useBoolean(false);
  // @ts-ignore
  const fetch: T = async (...args) => {
    toggle(true);
    const data = await (asyncFn as any)(...args);
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
