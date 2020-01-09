import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { Container, Form, Header, LoginForm, RegisterForm } from "./styles";
import Button from "../Button";
import { Buttons } from "../Button/styles";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [size, setSize] = React.useState(0);
  const loginRef = React.useRef<HTMLDivElement>(null);
  const registerRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const handleFormResize = () => {
    if (loginRef && loginRef.current && registerRef && registerRef.current) {
      let toChangeSize: number;
      if (index === 1) {
        toChangeSize = registerRef.current.getBoundingClientRect().height;
      } else {
        toChangeSize = loginRef.current.getBoundingClientRect().height;
      }

      setSize(toChangeSize);
    }
  };
  const handleFormResizeTimed = () => {
    setTimeout(handleFormResize, 500);
  };
  React.useEffect(() => {
    if (window) {
      window.addEventListener("blur", handleFormResize);
      window.addEventListener("resize", handleFormResize);
    }
    return () => window.removeEventListener("resize", handleFormResize);
  }, []);
  React.useEffect(handleFormResize, [loginRef, registerRef, index]);
  return (
    <Container size={size}>
      <LoginForm ref={loginRef} index={index}>
        <Header>Login</Header>
        <Form>
          <Input name="Username" />
          <Input name="Password" type="password" />
        </Form>
        <Buttons>
          <Button isFull instance="primary">
            Login
          </Button>
          <Button onClick={() => setIndex(1)} isFull instance="secondary">
            Register
          </Button>
        </Buttons>
      </LoginForm>
      <RegisterForm ref={registerRef} index={index}>
        <Header>Register</Header>
        <Form onBlur={handleFormResizeTimed}>
          <Input name="Username" />
          <Input name="Email" type="email" />
          <Input name="ConfirmEmail" type="email" />
          <Input name="Password" type="password" />
          <Input name="ConfirmPassword" type="password" />
        </Form>
        <Buttons>
          <Button isFull instance="primary">
            Register
          </Button>
          <Button onClick={() => setIndex(0)} isFull instance="secondary">
            Voltar
          </Button>
        </Buttons>
      </RegisterForm>
    </Container>
  );
};

export default Login;
