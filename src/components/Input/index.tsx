import React from "react";
import { StyledInput, Container, Label } from "./styles";

interface Props {
  type?: string;
  name: string;
}

const Input: React.FC<Props> = ({ type = "text", name, ...props }) => {
  return (
    <Container>
      <Label>{name}</Label>
      <StyledInput type={type} {...props} />
    </Container>
  );
};

export default Input;
