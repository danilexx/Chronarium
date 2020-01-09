import React from "react";
import { StyledInput, Container, Label } from "./styles";

interface Props {
  type?: string;
  name: string;
  onBlur?: any;
  props?: any;
  prettyName?: string;
}

export type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, Props>(
  ({ type = "text", name, prettyName, ...props }, ref) => {
    const [firstLetter, ...rest] = name;
    const prettyRest = rest.join("");
    const label = prettyName || firstLetter.toUpperCase() + prettyRest;
    return (
      <Container>
        <StyledInput ref={ref} type={type} name={name} required {...props} />
        <Label>{label}</Label>
      </Container>
    );
  }
);

export default Input;
