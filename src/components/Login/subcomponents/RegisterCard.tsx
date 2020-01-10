import React, { createContext } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import useFetch from "use-http";
import ReactResizeDetector from "react-resize-detector";
import { RegisterForm, Header } from "../styles";
import Input from "../../Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "./types";
import { RegisterValidationSchema } from "./ValidationSchemas";
import Form from "./Form";

interface RegisterFormData {
  username: string;
  password: string;
  password_confirmation: string;
  email: string;
  email_confirmation: string;
}

const RegisterCard: React.FC<FormProps> = ({
  index,
  onChange,
  formRef,
  iChanged
}) => {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    triggerValidation,
    watch
  } = useForm<RegisterFormData>({
    validationSchema: RegisterValidationSchema
  });
  const [request, response] = useFetch({ path: "/users" });
  const onSubmit = handleSubmit(async data => {
    // await request.post(data);
    console.log(data);
  });
  // useUpdateEffect(() => {
  //   iChanged();
  // }, [errors]);
  return (
    <RegisterForm ref={formRef} index={index}>
      <Header>Register</Header>
      <Form
        watch={watch}
        onSubmit={onSubmit}
        errors={errors}
        register={register}
      >
        <ReactResizeDetector handleHeight onResize={iChanged} />
        <Input name="username" />
        <Input name="email" type="email" />
        <Input
          name="email_confirmation"
          prettyName="Email Confirmation"
          type="email"
        />
        <Input name="password" type="password" />
        <Input
          name="password_confirmation"
          prettyName="Password Confirmation"
          type="password"
        />
        <Buttons>
          <LoadingButton
            loading={request.loading}
            isFull
            type="submit"
            instance="primary"
          >
            Register
          </LoadingButton>
          <Button onClick={() => onChange(0)} isFull instance="secondary">
            Voltar
          </Button>
        </Buttons>
      </Form>
    </RegisterForm>
  );
};

export default RegisterCard;
