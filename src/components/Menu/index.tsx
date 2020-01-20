import React, { ReactChild } from "react";
import { Container, MenuItem, MenuItemAction } from "./styles";
import { useStoreState, useStoreActions } from "-/src/utils/EasyPeasy";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  navSize: number;
  toggle?: (value?: boolean) => void;
}

const Menu: React.FC<Props> = ({ children, isOpen, toggle, navSize = 0 }) => {
  const isLogged = useStoreState(state => state.user.isLogged);
  const logout = useStoreActions(state => state.user.logout);
  const linkAction = () => {
    console.log("oi");
    if (toggle) {
      toggle();
    }
  };
  return (
    <Container navSize={navSize} isOpen={isOpen}>
      {isLogged ? (
        <MenuItemAction
          onClick={() => {
            logout();
            linkAction();
          }}
        >
          Logout
        </MenuItemAction>
      ) : (
        <MenuItem onClick={linkAction} href="/login">
          Login
        </MenuItem>
      )}
      <MenuItem onClick={linkAction} href="/">
        Home
      </MenuItem>
      <MenuItem onClick={linkAction} href="/adventures">
        Adventures
      </MenuItem>
      <MenuItem onClick={linkAction} href="/mastering">
        Mastering
      </MenuItem>
    </Container>
  );
};

export default Menu;
