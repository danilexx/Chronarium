import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { Form, LoginForm, Header } from "../styles";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "./types";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginCard: React.FC<FormProps> = ({ formRef, setIndex, index }) => {
  const [request, response] = useFetch({ path: "/sessions" });
  const { register, handleSubmit } = useForm<LoginFormData>();
  const onSubmit = handleSubmit(async data => {
    request.post(data);
  });
  React.useEffect(() => {
    console.log(response.data);
  }, [response.data]);
  return (
    <LoginForm ref={formRef} index={index}>
      <Header>Login</Header>
      <Form onSubmit={onSubmit}>
        <Input ref={register} name="username" />
        <Input ref={register} name="password" type="password" />
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
            onClick={() => setIndex(1)}
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
