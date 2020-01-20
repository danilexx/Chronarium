import { useList, useLocalStorage, useSessionStorage } from "react-use";
import React, { useState, Dispatch, SetStateAction } from "react";

type returnType = [
  number,
  {
    index: number;
    setIndex: (toChangeIndex: number) => void;
    handleSize: (toChangeStateIndex: number) => (height: number) => void;
    size: number;
    items: number;
  },
  () => void
];

const useRememberResizableForm = (
  customKey = "index",
  initialList = [0, 0],
  initialIndex = 0
): returnType => {
  // const [list, setList] = useLocalStorage("list", initialList);
  const [sizes, { updateAt }] = useList(initialList);
  const [items, setItems] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [index, setIndex] = useSessionStorage(customKey, initialIndex);
  const handleFormResize = () => {
    // console.log(index);
    setActiveSize(sizes[index]);
  };
  const handleSize = (toChangeStateIndex: number) => (height: number) =>
    updateAt(toChangeStateIndex, height);
  React.useEffect(handleFormResize, [index, sizes]);
  React.useEffect(() => {
    setItems(sizes.length);
  }, [sizes]);

  const reset = () => {
    setIndex(initialIndex);
  };
  return [
    activeSize,
    { index, setIndex, handleSize, size: activeSize, items },
    reset
  ];
};

export default useRememberResizableForm;
