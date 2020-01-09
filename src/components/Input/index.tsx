import React from "react";
import { StyledInput, Container, Label } from "./styles";

interface Props {
  type?: string;
  name: string;
  onBlur?: any;
}

const Input: React.FC<Props> = ({ type = "text", name, ...props }) => {
  return (
    <Container>
      <StyledInput type={type} required {...props} />
      <Label>{name}</Label>
    </Container>
  );
};

export default Input;
