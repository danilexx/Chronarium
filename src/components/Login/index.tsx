import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { Container, Form, Header, LoginForm, RegisterForm } from "./styles";
import Button from "../Button";
import { Buttons } from "../Button/styles";
import LoginCard from "./subcomponents/LoginCard";
import RegisterCard from "./subcomponents/RegisterCard";

const Login = () => {
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
  React.useEffect(handleFormResize, [index]);
  return (
    <Container size={size}>
      <LoginCard index={index} setIndex={setIndex} formRef={loginRef} />
      <RegisterCard index={index} setIndex={setIndex} formRef={registerRef} />
    </Container>
  );
};

export default Login;
