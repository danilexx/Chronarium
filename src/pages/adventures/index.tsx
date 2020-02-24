import React from "react";
import Router, { useRouter } from "next/router";
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
import PageTitle from "-/src/components/PageTitle";
import usePopup from "-/src/utils/hooks/usePopup";

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
  const router = useRouter();
  const [Popup, options] = usePopup("adventurePassword");
  const [activeAdventureId, setActiveAdventureId] = React.useState(0);
  const enterAdventure = async (adventureId, hasPassword) => {
    if (hasPassword) {
      setActiveAdventureId(adventureId);
      options.toggle(true);
    } else {
      router.push(`/adventures/${adventureId}/home`);
    }
  };
  return (
    <>
      <Column isFull>
        <PageTitle message="Adventures" />
        <Breadcumb parts={parts} />
        <Header>Adventures</Header>
        {adventuresData.length > 0 ? (
          <Adventures>
            {adventuresData.map(adventure => {
              return (
                <AdventureCard
                  onClick={() =>
                    enterAdventure(adventure.id, adventure.hasPassword)
                  }
                  adventure={adventure}
                />
              );
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
      <Popup {...options} adventureId={activeAdventureId} />
    </>
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
