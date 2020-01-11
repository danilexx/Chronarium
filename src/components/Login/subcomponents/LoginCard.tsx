import React from "react";
import useFetch from "use-http";
import { useMeasure } from "react-use";
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
  const [Popup, { toggle, isActive }] = usePopup();
  const [ref, { height }] = useMeasure();
  React.useEffect(() => {
    onResize(height);
  }, [height]);
  const onSubmit = async (data: any) => {
    // request.post(data);
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
            onClick={() => toggle()}
            isFull
            instance="secondary"
          >
            Register
          </Button>
        </Buttons>
      </Form>
      <Popup isActive={isActive} onChange={toggle}>
        Oi
      </Popup>
    </LoginForm>
  );
};

export default LoginCard;
