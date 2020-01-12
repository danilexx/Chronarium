import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { useUpdateEffect, useMeasure } from "react-use";
import Router from "next/router";
import { RegisterForm, Header } from "../styles";
import Input from "../../Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "./types";
import { RegisterValidationSchema } from "./ValidationSchemas";
import Form from "./Form";
import usePopup from "-/src/utils/hooks/usePopup";
import formatValidationErrorMessage from "-/src/utils/formatValidationErrorMessage";
import useAwait from "-/src/utils/hooks/useAwait";
import { useStoreState, useStoreActions } from "-/src/utils/EasyPeasy";
import getErrorMessage from "-/src/utils/getErrorMessage";

interface RegisterFormData {
  username: string;
  password: string;
  password_confirmation: string;
  email: string;
  email_confirmation: string;
}

const RegisterCard: React.FC<FormProps> = ({ index, onChange, onResize }) => {
  const [Popup, popupProps] = usePopup("error");
  const [ref, { height }] = useMeasure();
  React.useEffect(() => {
    onResize(height);
  }, [height]);
  const register = useStoreActions(state => state.user.register);
  const [isLoading, fetch, { toggle }] = useAwait(register);
  const onSubmit = async (data: any) => {
    try {
      await fetch(data);
      Router.push("/adventures");
    } catch (error) {
      const message = getErrorMessage(error);
      toggle(false);
      popupProps.show(message);
    }
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
            loading={isLoading}
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
      <Popup {...popupProps} title="Erro" />
    </RegisterForm>
  );
};

export default RegisterCard;
