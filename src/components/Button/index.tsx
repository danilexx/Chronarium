import React from "react";
import { Container, ButtonLoadingBar } from "./styles";

interface Props {
  instance?: "primary" | "secondary" | "error";
  children?: React.ReactNode;
  isFull?: boolean;
  onClick?: any;
}
type ButtonType = Props & React.ButtonHTMLAttributes<any>;
const Button: React.FC<ButtonType> = ({
  instance = "primary",
  children,
  isFull = false,
  type = "button",
  ...props
}) => {
  return (
    <Container type={type} isFull={isFull} instance={instance} {...props}>
      {children}
    </Container>
  );
};

export default Button;
interface LoadingProps {
  loading?: boolean;
}
export const LoadingButton: React.FC<LoadingProps & ButtonType> = ({
  children,
  loading = false,
  onClick,
  ...props
}) => {
  const handleFn = e => {
    if (!loading && onClick) {
      onClick(e);
    }
  };
  return (
    <Button onClick={handleFn} {...props}>
      {loading ? "Loading..." : children}
      <ButtonLoadingBar isGoing={loading} />
    </Button>
  );
};
