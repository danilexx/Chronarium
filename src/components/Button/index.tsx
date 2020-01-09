import React from "react";
import { Container } from "./styles";

interface Props {
  instance: "primary" | "secondary";
  children: React.ReactNode;
  isFull?: boolean;
}

const Button: React.FC<Props> = ({ instance, children, isFull = false }) => {
  return (
    <Container isFull={isFull} instance={instance}>
      {children}
    </Container>
  );
};

export default Button;
