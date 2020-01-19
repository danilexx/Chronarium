import { createContext, Dispatch, SetStateAction, useEffect } from "react";
import { useLocalStorage, useSessionStorage } from "react-use";
import { NewAdventureBackground, RowLayout } from "../shared";
import { SizeableContainer } from "../shared/form";
import AdventureForm from "./subcomponents/AdventureForm";
import useRememberResizableForm from "-/src/utils/hooks/useRememberResizableForm";
import MasterForm from "./subcomponents/MasterForm";
import LoreForm from "./subcomponents/LoreForm";
import ConfigForm from "./subcomponents/ConfigForm";
import ConfirmForm from "./subcomponents/ConfirmForm";
import Stepper from "../Stepper";
import RoomConfigForm from "./subcomponents/RoomConfig";
import FetchForm from "./subcomponents/FetchForm";

const initialState = {
  adventureName: "",
  adventureDescription: "",
  adventureIcon: undefined,
  masterIcon: undefined,
  masterName: "",
  adventureLore: "",
  initialGold: 300,
  attributesMinimum: 3,
  attributesPointsToSpend: 4,
  baseLife: 300,
  baseMana: 200,
  baseExperience: 50,
  otherExperiences: 50,
  maxPlayersQuantity: 5,
  adventurePassword: ""
};
type typedInitialState = typeof initialState;
type StateUpdater = any;
export const NewAdventureContext = createContext({
  state: initialState,
  setState: (newValue: StateUpdater) => {}
});
const getUrl = (text: string): string => `/icons/steps/${text}.svg`;
const steps = [
  { iconUrl: getUrl("adventure"), index: 0, name: "Adventure" },
  { iconUrl: getUrl("master"), index: 1, name: "Master" },
  { iconUrl: getUrl("lore"), index: 2, name: "Lore" },
  { iconUrl: getUrl("config"), index: 3, name: "Config" },
  { iconUrl: getUrl("config"), index: 4, name: "Room Config" },
  { iconUrl: getUrl("checkout"), index: 5, name: "Checkout" }
];

const NewAdventure = () => {
  const [state, setState] = useSessionStorage("adventure", initialState);
  const [activeSize, formProps] = useRememberResizableForm();
  const handleAction = (n: number) => {
    formProps.setIndex(n);
  };
  return (
    <NewAdventureContext.Provider value={{ state, setState }}>
      <NewAdventureBackground>
        <RowLayout center isFull={false}>
          <SizeableContainer {...formProps}>
            <AdventureForm {...formProps} onResize={formProps.handleSize(0)} />
            <MasterForm {...formProps} onResize={formProps.handleSize(1)} />
            <LoreForm {...formProps} onResize={formProps.handleSize(2)} />
            <ConfigForm {...formProps} onResize={formProps.handleSize(3)} />
            <RoomConfigForm {...formProps} onResize={formProps.handleSize(4)} />
            <ConfirmForm {...formProps} onResize={formProps.handleSize(5)} />
            <FetchForm {...formProps} onResize={formProps.handleSize(6)} />
          </SizeableContainer>
          <Stepper
            activeIndex={formProps.index}
            action={handleAction}
            steps={steps}
          />
        </RowLayout>
      </NewAdventureBackground>
    </NewAdventureContext.Provider>
  );
};

export default NewAdventure;
