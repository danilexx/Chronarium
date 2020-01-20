import React from "react";
import dynamic from "next/dynamic";
import { useToggle } from "react-use";
import Link from "-/src/components/Link";
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

const Menu = dynamic(() => import("-/src/components/Menu"), { ssr: false });
const Nav = () => {
  const [menu, toggle] = useToggle(false);
  const [navSize, setNavSize] = React.useState(0);
  const navRef = React.useRef<HTMLDivElement>(null);
  const handleHamburguerMenu = () => {
    toggle();
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
          <Link href="/">
            <Logo />
          </Link>
          <Links>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/adventures">Adventures</NavItem>
            <NavItem href="/mastering">Mastering</NavItem>
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
      <Menu isOpen={menu} toggle={toggle} navSize={navSize} />
    </>
  );
};

export default Nav;
