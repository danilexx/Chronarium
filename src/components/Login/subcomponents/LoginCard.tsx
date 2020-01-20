import React from "react";
import Router from "next/router";
import { MainForm, FormHeader } from "-/src/components/shared/form";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "../../shared/types";
import Form from "-/src/components/Form";
import { loginValidationSchema } from "./ValidationSchemas";
import usePopup from "-/src/utils/hooks/usePopup";
import { useStoreActions } from "-/src/utils/EasyPeasy";
import useAwait from "-/src/utils/hooks/useAwait";
import getErrorMessage from "-/src/utils/getErrorMessage";
import useOnResize from "-/src/utils/hooks/useOnResize";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginCard: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  // const [request, response] = useFetch({ path: "/sessions" });
  const login = useStoreActions(state => state.user.login);
  const ref = useOnResize(onResize);
  const [isLoading, fetch, { toggle }] = useAwait(login);
  const [Popup, popupProps] = usePopup("error");
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
      <FormHeader>Login</FormHeader>
      <Form onSubmit={onSubmit} validationSchema={loginValidationSchema}>
        <Input name="username" />
        <Input name="password" type="password" />
        <Buttons>
          <LoadingButton
            loading={isLoading}
            type="submit"
            isFull
            instance="primary"
          >
            Login
          </LoadingButton>
          <Button
            type="button"
            onClick={() => setIndex(1)}
            isFull
            instance="secondary"
          >
            Register
          </Button>
        </Buttons>
      </Form>
      <Popup title="Erro" {...popupProps} />
    </MainForm>
  );
};

export default LoginCard;
