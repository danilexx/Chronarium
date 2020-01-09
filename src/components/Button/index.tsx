import React from "react";
import { Container } from "./styles";

interface Props {
  instance: "primary" | "secondary";
  children: React.ReactNode;
  isFull?: boolean;
  onClick?: any;
}
type ButtonType = Props & React.ButtonHTMLAttributes<any>;
const Button: React.FC<ButtonType> = ({
  instance,
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
  ...props
}) => {
  return <Button {...props}>{loading ? "loading..." : children}</Button>;
};
