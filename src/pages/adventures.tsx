import React from "react";
import { Column } from "-/src/components/shared";
import { Header } from "-/src/components/Header";
import useUserRoute from "../utils/hooks/useUserRoute";
import AdventureCard, { Adventures } from "../components/AdventureCard";

const adventures = () => {
  useUserRoute();
  return (
    <Column isFull>
      <Header>Adventures</Header>
      <Adventures>
        <AdventureCard />
      </Adventures>
    </Column>
  );
};

export default adventures;
