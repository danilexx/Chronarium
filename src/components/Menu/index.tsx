import React, { ReactChild } from "react";
import { Container, MenuItem, MenuItemAction } from "./styles";
import { useStoreState, useStoreActions } from "-/src/utils/EasyPeasy";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  navSize: number;
}

const Menu: React.FC<Props> = ({ children, isOpen, navSize = 0 }) => {
  const isLogged = useStoreState(state => state.user.isLogged);
  const logout = useStoreActions(state => state.user.logout);
  return (
    <Container navSize={navSize} isOpen={isOpen}>
      {isLogged ? (
        <MenuItemAction
          onClick={() => {
            logout();
          }}
        >
          Logout
        </MenuItemAction>
      ) : (
        <MenuItem href="/login">Login</MenuItem>
      )}
      <MenuItem href="/">Home</MenuItem>
      <MenuItem href="/adventures">Adventures</MenuItem>
      <MenuItem href="/mastering">Mastering</MenuItem>
    </Container>
  );
};

export default Menu;
