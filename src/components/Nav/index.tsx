import React from "react";
import Menu from "-/src/components/Menu";
import {
  Container,
  Logo,
  NavItem,
  Links,
  Collection,
  Items,
  Icon
} from "./styles";
import { FriendsIcon, HamburguerIcon } from "./icons";

const Nav = () => {
  const [menu, setMenu] = React.useState(false);
  const [navSize, setNavSize] = React.useState(0);
  const navRef = React.useRef<HTMLDivElement>(null);
  const handleHamburguerMenu = () => {
    setMenu(state => !state);
  };
  React.useEffect(() => {
    if (navRef && navRef.current) {
      const size = navRef.current?.getBoundingClientRect().height;
      setNavSize(size);
    }
  }, [navRef]);
  return (
    <>
      <Container ref={navRef}>
        <Collection>
          <Logo />
          <Links>
            <NavItem>Inicio</NavItem>
            <NavItem>Aventuras</NavItem>
            <NavItem>Mestragem</NavItem>
          </Links>
          <Items>
            <Icon>
              <FriendsIcon />
            </Icon>
            <Icon type="filled" onClick={handleHamburguerMenu}>
              <HamburguerIcon />
            </Icon>
          </Items>
        </Collection>
      </Container>
      <Menu isOpen={menu} navSize={navSize}>
        Oi
      </Menu>
    </>
  );
};

export default Nav;
