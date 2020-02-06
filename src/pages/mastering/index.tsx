import React from "react";
import { getMyMasteringAdventures } from "-/src/services";
import { AdventureModel } from "-/src/services/types";
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

const mastering = ({ adventures }: { adventures: AdventureModel[] }) => {
  useUserRoute();
  return (
    <Column isFull>
      <Breadcumb parts={parts} />
      <Header>Mastering</Header>
      <Adventures>
        <CreateAdventureCard />
        {adventures.map(adventure => (
          <AdventureCard adventure={adventure} />
        ))}
      </Adventures>
    </Column>
  );
};

mastering.getInitialProps = async (ctx: any) => {
  try {
    const response = await getMyMasteringAdventures(ctx);
    return {
      adventures: response.data
    };
  } catch (err) {
    // console.log(err);
    return {
      adventures: []
    };
  }
};

export default mastering;
