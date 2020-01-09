import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { Container, Form, Header } from "./styles";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  return (
    <Container>
      <Header>Login</Header>
      <Form>
        <Input name="Username" />
        <Input name="Password" type="password" />
      </Form>
    </Container>
  );
};

export default Login;
