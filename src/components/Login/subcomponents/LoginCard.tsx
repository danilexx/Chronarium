import React from "react";
import useFetch from "use-http";
import { useMeasure } from "react-use";
import jwt_decode from "jwt-decode";
import { LoginForm, Header } from "../styles";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "./types";
import Form from "./Form";
import { loginValidationSchema } from "./ValidationSchemas";
import usePopup from "-/src/utils/hooks/usePopup";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginCard: React.FC<FormProps> = ({ onChange, index, onResize }) => {
  const [request, response] = useFetch({ path: "/sessions" });
  const [ref, { height }] = useMeasure();
  React.useEffect(() => {
    onResize(height);
  }, [height]);
  const [Popup, popupProps] = usePopup("error");

  const onSubmit = async (data: any) => {
    await request.post(data);
    if (response.status === undefined) {
      popupProps.show("Servidor Offline");
    }
    if (response.status === 401) {
      popupProps.show(response.data.error.message);
    }
    const { token } = response.data;
    console.log(jwt_decode(token));
  };
  return (
    <LoginForm ref={ref} index={index}>
      <Header>Login</Header>
      <Form onSubmit={onSubmit} validationSchema={loginValidationSchema}>
        <Input name="username" />
        <Input name="password" type="password" />
        <Buttons>
          <LoadingButton
            loading={request.loading}
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
