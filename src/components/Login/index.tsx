import React, { useState } from "react";
import { useList } from "react-use";
import { Container } from "./styles";
import LoginCard from "./subcomponents/LoginCard";
import RegisterCard from "./subcomponents/RegisterCard";

const Login = () => {
  const [sizes, { updateAt }] = useList([0, 0]);
  const [activeSize, setActiveSize] = useState(0);
  const [index, setIndex] = React.useState(0);
  const handleFormResize = () => {
    setActiveSize(sizes[index]);
  };
  const handleSize = (toChangeStateIndex: number) => (_: any, height: number) =>
    updateAt(toChangeStateIndex, height);
  React.useEffect(handleFormResize, [index, sizes]);
  return (
    <Container size={activeSize}>
      <LoginCard onResize={handleSize(0)} index={index} onChange={setIndex} />
      <RegisterCard
        index={index}
        onChange={setIndex}
        onResize={handleSize(1)}
      />
    </Container>
  );
};

export default Login;
