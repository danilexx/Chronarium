import { createContext, Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "react-use";
import { NewAdventureBackground, Column } from "../shared";
import { SizeableContainer } from "../shared/form";
import AdventureForm from "./subcomponents/AdventureForm";
import useResizableForm from "-/src/utils/hooks/useResizableForm";
import MasterForm from "./subcomponents/MasterForm";
import LoreForm from "./subcomponents/LoreForm";

const initialState = {
  adventureName: "",
  adventureDescription: ""
};

type NewAdventureInformationModel = typeof initialState;

const NewAdventureContext = createContext({
  state: initialState,
  setState: (newValue: NewAdventureInformationModel) => {}
});

const NewAdventure = () => {
  const [state, setState] = useLocalStorage("adventure", initialState);
  const [activeSize, formProps] = useResizableForm();
  return (
    <NewAdventureContext.Provider value={{ state, setState }}>
      <NewAdventureBackground>
        <Column center isFull>
          <SizeableContainer size={activeSize}>
            <AdventureForm {...formProps} onResize={formProps.handleSize(0)} />
            <MasterForm {...formProps} onResize={formProps.handleSize(1)} />
            <LoreForm {...formProps} onResize={formProps.handleSize(2)} />
          </SizeableContainer>
        </Column>
      </NewAdventureBackground>
    </NewAdventureContext.Provider>
  );
};

export default NewAdventure;
