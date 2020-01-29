import Router, { useRouter } from "next/router";
import { Container, NavigatorItem } from "./styles";

interface LinkProps {
  children: React.ReactNode;
  to: string;
}

const Link: React.FC<LinkProps> = ({ children, to }) => {
  const router = useRouter();
  const route = "/mastering/[adventureId]/[step]";
  const as = `/mastering/${router.query.adventureId}/${to}`;
  function handleShallowRouting() {
    Router.push(route, as || route, { shallow: true });
  }
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
      <Link to="npcs">Items</Link>
      <Link to="npcs">Players</Link>
    </Container>
  );
};

export default Navigator;
