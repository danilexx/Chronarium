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
  isFull?: boolean;
  noError?: boolean;
  style?: any;
  step?: string;
}

export type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, Props>(
  (
    {
      type = "text",
      name,
      prettyName,
      controlled = false,
      optional = false,
      max = 999,
      min = 0,
      isFull = false,
      noError = false,
      style = {},
      ...props
    },
    ref
  ) => {
    const { triggerValidation, register, errors, control } = useFormContext();
    const [firstLetter, ...rest] = name;
    const prettyRest = rest.join("");
    const label =
      prettyName !== undefined
        ? prettyName
        : firstLetter.toUpperCase() + prettyRest;

    const component = React.useMemo(
      () => (
        <StyledInput
          ref={register}
          type={type}
          name={name}
          max={max}
          min={min}
          defaultValue=""
          required={!optional}
          placeholder={optional ? "Optional" : ""}
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
        <Container style={style} isFull={isFull}>
          {component}
          <Label>{label}</Label>
        </Container>
        {noError || (
          <ErrorContainer>
            <ErrorMessage errors={errors} name={name} />
          </ErrorContainer>
        )}
      </>
    );
  }
);

export default Input;
