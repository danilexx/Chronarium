import React from "react";
import { Column, Background } from "-/src/components/shared";
import Login from "-/src/components/Login";

const Home: React.FC = () => {
  return (
    <Background>
      <Column isFull>
        <Login />
      </Column>
    </Background>
  );
};

export default Home;
