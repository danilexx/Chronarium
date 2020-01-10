import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { LoginForm, Header } from "../styles";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "./types";
import Form from "./Form";

interface LoginFormData {
  name: string;
  password: string;
}

const LoginCard: React.FC<FormProps> = ({ formRef, onChange, index }) => {
  const [request, response] = useFetch({ path: "/sessions" });
  const { register, handleSubmit, errors, watch } = useForm<LoginFormData>();
  const onSubmit = handleSubmit(async data => {
    request.post(data);
  });
  React.useEffect(() => {
    console.log(response.data);
  }, [response.data]);

  return (
    <LoginForm ref={formRef} index={index}>
      <Header>Login</Header>
      <Form
        register={register}
        watch={watch}
        errors={errors}
        onSubmit={onSubmit}
      >
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
