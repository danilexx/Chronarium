import { useList } from "react-use";
import React, { useState, Dispatch, SetStateAction } from "react";

type returnType = [
  number,
  {
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
    handleSize: (toChangeStateIndex: number) => (height: number) => void;
  }
];

const useResizableForm = (
  initialList = [0, 0],
  initialIndex = 0
): returnType => {
  const [sizes, { updateAt }] = useList(initialList);
  const [activeSize, setActiveSize] = useState(0);
  const [index, setIndex] = React.useState(initialIndex);
  const handleFormResize = () => {
    setActiveSize(sizes[index]);
  };
  const handleSize = (toChangeStateIndex: number) => (height: number) =>
    updateAt(toChangeStateIndex, height);
  React.useEffect(handleFormResize, [index, sizes]);

  return [activeSize, { index, setIndex, handleSize }];
};

export default useResizableForm;
