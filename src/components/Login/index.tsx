import React from "react";
import { Container } from "./styles";
import LoginCard from "./subcomponents/LoginCard";
import RegisterCard from "./subcomponents/RegisterCard";

const Login = () => {
  const [size, setSize] = React.useState(0);
  const loginRef = React.useRef<HTMLDivElement>(null);
  const registerRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);
  const [hasChanged, setHasChanged] = React.useState(0);
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

  const handleChange = (nextIndex: number): void => {
    setIndex(nextIndex);
  };
  const iChanged = () => setHasChanged(changed => changed + 1);
  React.useEffect(handleFormResize, [index, hasChanged]);
  return (
    <Container size={size}>
      <LoginCard
        index={index}
        onChange={handleChange}
        formRef={loginRef}
        iChanged={iChanged}
      />
      <RegisterCard
        iChanged={iChanged}
        index={index}
        onChange={handleChange}
        formRef={registerRef}
      />
    </Container>
  );
};

export default Login;
