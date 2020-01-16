import React from "react";
import { ErrorMessage, useFormContext, Controller } from "react-hook-form";
import {
  StyledInput,
  Container,
  Label,
  ErrorContainer,
  StyledTextArea
} from "./styles";

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

interface CustomProps {
  rows?: number;
}

const Textarea = React.forwardRef<Ref, Props & CustomProps>(
  (
    {
      type = "text",
      name,
      prettyName,
      register,
      errors,
      controlled = false,
      rows = 5,
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
        <StyledTextArea
          ref={register || ref}
          type={type}
          name={name}
          defaultValue=""
          hasValue={watch(name) !== ""}
          rows={rows}
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

export default Textarea;
