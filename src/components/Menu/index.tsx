import React, { ReactChild } from "react";
import { Container } from "./styles";

interface Props {
  children: ReactChild;
  isOpen: boolean;
  navSize: number;
}

const Menu: React.FC<Props> = ({ children, isOpen, navSize = 0 }) => {
  return (
    <Container navSize={navSize} isOpen={isOpen}>
      {children}
    </Container>
  );
};

export default Menu;
