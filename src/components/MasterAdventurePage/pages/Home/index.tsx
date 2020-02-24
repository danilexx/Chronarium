import dynamic from "next/dynamic";
import { Container } from "./styles";

const Chat = dynamic(() => import("-/src/components/Chat"), { ssr: false });
const Home = () => {
  return (
    <Container>
      <Chat />
    </Container>
  );
};

export default Home;
