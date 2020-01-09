import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { RegisterForm, Header, Form } from "../styles";
import Input from "../../Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "./types";

interface RegisterFormData {}

const RegisterCard: React.FC<FormProps> = ({ index, setIndex, formRef }) => {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const [request, response] = useFetch({ path: "/users" });
  const onSubmit = handleSubmit(async data => {
    await request.post(data);
    console.log(response.data);
  });

  return (
    <RegisterForm ref={formRef} index={index}>
      <Header>Register</Header>
      <Form onSubmit={onSubmit}>
        <Input ref={register({ required: true })} name="username" />
        <Input ref={register({ required: true })} name="email" type="email" />
        <Input
          ref={register({ required: true })}
          name="email_confirmation"
          prettyName="Email Confirmation"
          type="email"
        />
        <Input
          ref={register({ required: true })}
          name="password"
          type="password"
        />
        <Input
          ref={register({ required: true })}
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
          <Button onClick={() => setIndex(0)} isFull instance="secondary">
            Voltar
          </Button>
        </Buttons>
      </Form>
    </RegisterForm>
  );
};

export default RegisterCard;
