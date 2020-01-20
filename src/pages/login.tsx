import React from "react";
import { Column, Background } from "-/src/components/shared";
import Login from "-/src/components/Login";
import useGuestRoute from "../utils/hooks/useGuestRoute";

const Home: React.FC = () => {
  useGuestRoute("/adventures");
  return (
    <Background>
      <Column center isFull>
        <Login />
      </Column>
    </Background>
  );
};

export default Home;
