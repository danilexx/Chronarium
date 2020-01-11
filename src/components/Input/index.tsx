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
      ...props
    },
    ref
  ) => {
    const [firstLetter, ...rest] = name;
    const prettyRest = rest.join("");
    const label = prettyName || firstLetter.toUpperCase() + prettyRest;
    // const fieldValue = watch(name, false);
    const {
      control,
      formState: { dirty, isValid },
      watch,
      triggerValidation
    } = useFormContext();

    const component = React.useMemo(
      () => (
        <StyledInput
          ref={register || ref}
          type={type}
          name={name}
          defaultValue=""
          hasValue={watch(name) !== ""}
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
      [dirty, watch(name), errors[name]]
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
