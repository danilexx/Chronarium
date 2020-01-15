import React from "react";
import { Column } from "-/src/components/shared";
import { Header } from "-/src/components/Header";
import useUserRoute from "-/src/utils/hooks/useUserRoute";
import AdventureCard, { Adventures } from "-/src/components/AdventureCard";
import Breadcumb from "-/src/components/Breadcumb";

const parts = [
  { label: "Home", path: "/" },
  { label: "Adventures", path: "/adventures" }
];

const adventures = () => {
  // useUserRoute();
  return (
    <Column isFull>
      <Breadcumb parts={parts} />
      <Header>Adventures</Header>
      <Adventures>
        <AdventureCard />
        <AdventureCard />
        <AdventureCard />
      </Adventures>
    </Column>
  );
};

export default adventures;
