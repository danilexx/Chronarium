import { useList, useLocalStorage } from "react-use";
import React, { useState, Dispatch, SetStateAction } from "react";

type returnType = [
  number,
  {
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
    handleSize: (toChangeStateIndex: number) => (height: number) => void;
    size: number;
    items: number;
  }
];

const useRememberResizableForm = (
  initialList = [0, 0],
  initialIndex = 0
): returnType => {
  // const [list, setList] = useLocalStorage("list", initialList);
  const [sizes, { updateAt }] = useList(initialList);
  const [items, setItems] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [index, setIndex] = useState(initialIndex);
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

  return [activeSize, { index, setIndex, handleSize, size: activeSize, items }];
};

export default useRememberResizableForm;
