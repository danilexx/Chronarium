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
import { useStoreState } from "-/src/utils/EasyPeasy";

const Menu = dynamic(() => import("-/src/components/Menu"), { ssr: false });
const FriendsMenu = dynamic(() => import("-/src/components/FriendsMenu"), {
  ssr: false
});
const Nav = () => {
  const [menu, toggle] = useToggle(false);
  const [friendsMenu, toggleFriends] = useToggle(true);
  const [navSize, setNavSize] = React.useState(0);
  const navRef = React.useRef<HTMLDivElement>(null);
  const isLogged = useStoreState(state => state.user.isLogged);

  const handleHamburguerMenu = () => {
    toggleFriends(false);
    toggle();
  };
  const handleFriendsMenu = () => {
    toggle(false);
    toggleFriends();
  };
  React.useEffect(() => {
    if (navRef && navRef.current) {
      const size = navRef.current?.getBoundingClientRect().height;
      setNavSize(size);
    }
  }, []);
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
            {isLogged && (
              <Icon onClick={handleFriendsMenu}>
                <FriendsIcon />
              </Icon>
            )}
            <Icon type="filled" onClick={handleHamburguerMenu}>
              <HamburguerIcon />
            </Icon>
          </Items>
        </Collection>
      </Container>
      <Menu isOpen={menu} toggle={toggle} navSize={navSize} />
      {isLogged && (
        <FriendsMenu
          isOpen={friendsMenu}
          toggle={toggleFriends}
          navSize={navSize}
        />
      )}
    </>
  );
};

export default Nav;
