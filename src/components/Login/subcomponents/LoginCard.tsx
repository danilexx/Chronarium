import React from "react";
import { useMeasure } from "react-use";
import Router from "next/router";
import { LoginForm, Header } from "../styles";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "./types";
import Form from "./Form";
import { loginValidationSchema } from "./ValidationSchemas";
import usePopup from "-/src/utils/hooks/usePopup";
import { useStoreActions } from "-/src/utils/EasyPeasy";
import useAwait from "-/src/utils/hooks/useAwait";
import getErrorMessage from "-/src/utils/getErrorMessage";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginCard: React.FC<FormProps> = ({ onChange, index, onResize }) => {
  // const [request, response] = useFetch({ path: "/sessions" });
  const login = useStoreActions(state => state.user.login);
  const [ref, { height }] = useMeasure();
  React.useEffect(() => {
    onResize(height);
  }, [height]);
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
    <LoginForm ref={ref} index={index}>
      <Header>Login</Header>
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
            onClick={() => onChange(1)}
            isFull
            instance="secondary"
          >
            Register
          </Button>
        </Buttons>
      </Form>
      <Popup title="Erro" {...popupProps} />
    </LoginForm>
  );
};

export default LoginCard;
