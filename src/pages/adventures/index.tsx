import React from "react";
import Router from "next/router";
import { Column } from "-/src/components/shared";
import { Header } from "-/src/components/Header";
import useUserRoute from "-/src/utils/hooks/useUserRoute";
import AdventureCard, { Adventures } from "-/src/components/AdventureCard";
import Breadcumb from "-/src/components/Breadcumb";
import { getAdventures } from "-/src/services";
import { AdventureModel } from "-/src/services/types";
import getSafeAdventureImage from "-/src/utils/getSafeAdventureImage";
import Button from "-/src/components/Button";
import { EmptyMessage } from "-/src/components/AdventureCard/styles";

const parts = [
  { label: "Home", path: "/" },
  { label: "Adventures", path: "/adventures" }
];

const adventures = ({
  adventuresData
}: {
  adventuresData: AdventureModel[];
}) => {
  // useUserRoute();
  return (
    <Column isFull>
      <Breadcumb parts={parts} />
      <Header>Adventures</Header>
      {adventuresData.length > 0 ? (
        <Adventures>
          {adventuresData.map(adventure => {
            return <AdventureCard adventure={adventure} />;
          })}
        </Adventures>
      ) : (
        <EmptyMessage>
          Sorry, no adventures{" "}
          <Button
            onClick={() => {
              Router.push("/mastering/new");
            }}
          >
            Create One
          </Button>
        </EmptyMessage>
      )}
    </Column>
  );
};

adventures.getInitialProps = async () => {
  try {
    const response = await getAdventures();
    return { adventuresData: response.data };
  } catch (err) {
    return { adventuresData: [] };
  }
};
export default adventures;
