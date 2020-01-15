import React from "react";
import { useRouter } from "next/router";
import { Column } from "-/src/components/shared";
import { Header } from "-/src/components/Header";
import useUserRoute from "-/src/utils/hooks/useUserRoute";
import AdventureCard, {
  Adventures,
  CreateAdventureCard
} from "-/src/components/AdventureCard";
import Breadcumb from "-/src/components/Breadcumb";

const parts = [
  { label: "Home", path: "/" },
  { label: "Mastering", path: "/mastering" }
];

const mastering = () => {
  // useUserRoute();
  return (
    <Column isFull>
      <Breadcumb parts={parts} />
      <Header>Mastering</Header>
      <Adventures>
        <CreateAdventureCard />
        <AdventureCard />
        <AdventureCard />
      </Adventures>
    </Column>
  );
};

export default mastering;
