import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { Container, Form, Header } from "./styles";
import Button from "../Button";
import { Buttons } from "../Button/styles";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  return (
    <Container>
      <Header>Login</Header>
      <Form>
        <Input name="Username" />
        <Input name="Password" type="password" />
      </Form>
      <Buttons>
        <Button isFull instance="primary">
          Login
        </Button>
        <Button isFull instance="secondary">
          Register
        </Button>
      </Buttons>
    </Container>
  );
};

export default Login;
