import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import ReactResizeDetector, { withResizeDetector } from "react-resize-detector";
import { LoginForm, Header } from "../styles";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "./types";
import Form from "./Form";
import { loginValidationSchema } from "./ValidationSchemas";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginCard: React.FC<FormProps> = ({ onChange, index, onResize }) => {
  const [request, response] = useFetch({ path: "/sessions" });
  const onSubmit = async (data: any) => {
    // request.post(data);
  };
  return (
    <LoginForm index={index}>
      <Header>Login</Header>
      <ReactResizeDetector handleHeight onResize={onResize} />
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
    </LoginForm>
  );
};

export default LoginCard;
