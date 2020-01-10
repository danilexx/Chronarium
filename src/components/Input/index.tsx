import React, { useContext } from "react";
import { ErrorMessage } from "react-hook-form";
import { StyledInput, Container, Label, ErrorContainer } from "./styles";
import { FormContext } from "-/src/components/Login/subcomponents/Form";

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
    const { register, errors, watch } = useContext(FormContext);
    return (
      <>
        <Container>
          <StyledInput
            ref={register || ref}
            type={type}
            name={name}
            hasValue={Boolean(watch && watch(name, false))}
            isWrong={Boolean(errors[name])}
            required
            {...props}
          />
          <Label>{label}</Label>
        </Container>
        <ErrorContainer>
          <ErrorMessage errors={errors} name={name} />
        </ErrorContainer>
      </>
    );
  }
);

export default Input;
