import React from "react";
import { useMap, useLocalStorage } from "react-use";
import { Column, NewAdventureBackground } from "-/src/components/shared";
import Login from "-/src/components/Login";
import NewAdventure from "-/src/components/NewAdventure";

const newAdventure: React.FC = () => {
  // useGuestRoute("/adventures");
  return <NewAdventure />;
};

export default newAdventure;
