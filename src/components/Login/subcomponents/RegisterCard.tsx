import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { useUpdateEffect, useMeasure } from "react-use";
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

const RegisterCard: React.FC<FormProps> = ({ index, onChange, onResize }) => {
  const [request, response] = useFetch({ path: "/users" });
  const [ref, { height }] = useMeasure();
  React.useEffect(() => {
    onResize(height);
  }, [height]);
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <RegisterForm ref={ref} index={index}>
      <Header>Register</Header>
      <Form onSubmit={onSubmit} validationSchema={RegisterValidationSchema}>
        <Input name="username" />
        <Input name="email" type="email" />
        <Input
          name="email_confirmation"
          prettyName="Email Confirmation"
          type="email"
        />
        <Input controlled name="password" type="password" />
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
