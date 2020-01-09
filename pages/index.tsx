import React, { useEffect } from "react";
import { useFetch } from "use-http";
import { getLocale } from "-/src/services";
import getIsSafe from "-/src/utils/IsSafe";
import { Column, Background } from "-/src/components/shared";
import Login from "-/src/components/Login";
import { useStoreState } from "-/src/utils/EasyPeasy";

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
