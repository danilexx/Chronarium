import React from "react";
import Router from "next/router";
import { MainForm, FormHeader } from "-/src/components/shared/form";
import Input from "../../Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "../../shared/types";
import { RegisterValidationSchema } from "./ValidationSchemas";
import Form from "-/src/components/Form";
import usePopup from "-/src/utils/hooks/usePopup";
import useAwait from "-/src/utils/hooks/useAwait";
import { useStoreActions } from "-/src/utils/EasyPeasy";
import getErrorMessage from "-/src/utils/getErrorMessage";
import useOnResize from "-/src/utils/hooks/useOnResize";

interface RegisterFormData {
  username: string;
  password: string;
  password_confirmation: string;
  email: string;
  email_confirmation: string;
}

const RegisterCard: React.FC<FormProps> = ({ index, setIndex, onResize }) => {
  const [Popup, popupProps] = usePopup("error");
  const ref = useOnResize(onResize);
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
    <MainForm ref={ref} index={index}>
      <FormHeader>Register</FormHeader>
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
          <Button onClick={() => setIndex(0)} isFull instance="secondary">
            Voltar
          </Button>
        </Buttons>
      </Form>
      <Popup {...popupProps} title="Erro" />
    </MainForm>
  );
};

export default RegisterCard;
