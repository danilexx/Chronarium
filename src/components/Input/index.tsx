import React from "react";
import { ErrorMessage, useFormContext, Controller } from "react-hook-form";
import { StyledInput, Container, Label, ErrorContainer } from "./styles";

interface Props {
  type?: string;
  name: string;
  onBlur?: any;
  props?: any;
  prettyName?: string;
  register?: any;
  errors?: any;
  controlled?: boolean;
  optional?: boolean;
  max?: number;
  min?: number;
}

export type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, Props>(
  (
    {
      type = "text",
      name,
      prettyName,
      register,
      errors,
      controlled = false,
      optional = false,
      max = 999,
      min = 0,
      ...props
    },
    ref
  ) => {
    const [firstLetter, ...rest] = name;
    const prettyRest = rest.join("");
    const label = prettyName || firstLetter.toUpperCase() + prettyRest;
    // const fieldValue = watch(name, false);
    const { triggerValidation } = useFormContext();

    const component = React.useMemo(
      () => (
        <StyledInput
          ref={register || ref}
          type={type}
          name={name}
          max={max}
          min={min}
          defaultValue=""
          required={!optional}
          onChange={
            controlled
              ? () => {
                  triggerValidation(name);
                }
              : () => {}
          }
          isWrong={Boolean(errors[name])}
          {...props}
        />
      ),
      [errors[name]]
    );
    return (
      <>
        <Container>
          {component}
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
