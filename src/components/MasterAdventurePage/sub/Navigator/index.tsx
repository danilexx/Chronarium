import { useRouter } from "next/router";
import { Container, NavigatorItem } from "./styles";
import getAdventurePush from "-/src/utils/getAdventurePush";

interface LinkProps {
  children: React.ReactNode;
  to: string;
}

const Link: React.FC<LinkProps> = ({ children, to }) => {
  const router = useRouter();
  const handleShallowRouting = () => getAdventurePush(router)(to);

  return (
    <NavigatorItem onClick={handleShallowRouting}>{children}</NavigatorItem>
  );
};

const Navigator = () => {
  return (
    <Container>
      <Link to="home">Home</Link>
      <Link to="scenes">Scenes</Link>
      <Link to="npcs">Npcs</Link>
      <Link to="items">Items</Link>
      <Link to="skills">Skills</Link>
      <Link to="players">Players</Link>
    </Container>
  );
};

export default Navigator;
