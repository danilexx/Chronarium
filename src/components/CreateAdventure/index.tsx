import React, { useState } from "react";
import { useList } from "react-use";
import { Container } from "./styles";

const Login = () => {
  const [sizes, { updateAt }] = useList([0, 0]);
  const [activeSize, setActiveSize] = useState(0);
  const [index, setIndex] = React.useState(0);
  const handleFormResize = () => {
    setActiveSize(sizes[index]);
  };
  const handleSize = (toChangeStateIndex: number) => (height: number) =>
    updateAt(toChangeStateIndex, height);
  React.useEffect(handleFormResize, [index, sizes]);
  return (
    <Container size={activeSize}>
    </Container>
  );
};

export default Login;
