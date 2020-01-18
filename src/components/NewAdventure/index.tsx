import { createContext, Dispatch, SetStateAction, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { NewAdventureBackground, RowLayout } from "../shared";
import { SizeableContainer } from "../shared/form";
import AdventureForm from "./subcomponents/AdventureForm";
import useRememberResizableForm from "-/src/utils/hooks/useRememberResizableForm";
import MasterForm from "./subcomponents/MasterForm";
import LoreForm from "./subcomponents/LoreForm";
import ConfigForm from "./subcomponents/ConfigForm";
import ConfirmForm from "./subcomponents/ConfirmForm";
import Stepper from "../Stepper";

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
  otherExperiences: 50
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
  { iconUrl: getUrl("checkout"), index: 4, name: "Checkout" }
];

const NewAdventure = () => {
  const [state, setState] = useLocalStorage("adventure", initialState);
  const [activeSize, formProps] = useRememberResizableForm();
  return (
    <NewAdventureContext.Provider value={{ state, setState }}>
      <NewAdventureBackground>
        <RowLayout center style={{ margin: "0 auto" }} isFull={false}>
          <SizeableContainer {...formProps}>
            <AdventureForm {...formProps} onResize={formProps.handleSize(0)} />
            <MasterForm {...formProps} onResize={formProps.handleSize(1)} />
            <LoreForm {...formProps} onResize={formProps.handleSize(2)} />
            <ConfigForm {...formProps} onResize={formProps.handleSize(3)} />
            <ConfirmForm {...formProps} onResize={formProps.handleSize(4)} />
          </SizeableContainer>
          <Stepper
            activeIndex={formProps.index}
            action={formProps.setIndex}
            steps={steps}
          />
        </RowLayout>
      </NewAdventureBackground>
    </NewAdventureContext.Provider>
  );
};

export default NewAdventure;
