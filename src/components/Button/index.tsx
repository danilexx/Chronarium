import React from "react";
import { Container } from "./styles";

interface Props {
  instance: "primary" | "secondary";
  children: React.ReactNode;
  isFull?: boolean;
  onClick?: any;
}

const Button: React.FC<Props> = ({
  instance,
  children,
  isFull = false,
  ...props
}) => {
  return (
    <Container isFull={isFull} instance={instance} {...props}>
      {children}
    </Container>
  );
};

export default Button;
