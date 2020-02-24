import { createContext, Dispatch, SetStateAction, useEffect } from "react";
import { useLocalStorage, useSessionStorage } from "react-use";
import dynamic from "next/dynamic";
import { NewAdventureBackground, RowLayout } from "../shared";
import { SizeableContainer } from "../shared/form";
import useRememberResizableForm from "-/src/utils/hooks/useRememberResizableForm";
import useUserRoute from "-/src/utils/hooks/useUserRoute";
import { NewCharacterBackground } from "./styles";
import BasicInformationForm from "./subcomponents/BasicInformationForm";
import SteticInformationForm from "./subcomponents/SteticInformationForm";
import PersonalityForm from "./subcomponents/PersonalityForm";
import LoreForm from "./subcomponents/LoreForm";
import ConfirmForm from "./subcomponents/ConfirmForm";
import AttributesForm from "./subcomponents/AttributesForm";

const FetchForm = dynamic(() => import("./subcomponents/FetchForm"), {
  ssr: false
});

const Stepper = dynamic(() => import("../Stepper"), { ssr: false });
const initialState = {
  name: "",
  age: "",
  characterIcon: "",
  gender: "male",
  appearance: "",
  lore: "",
  height: "",
  personality: "",
  race: ""
};
type typedInitialState = typeof initialState;
type StateUpdater = any;
export const NewCharacterContext = createContext({
  state: initialState,
  setState: (newValue: StateUpdater) => {},
  resetState: () => {}
});
const getUrl = (text: string): string => `/icons/steps/${text}.svg`;
const steps = [
  { iconUrl: getUrl("form"), index: 0, name: "Form" },
  { iconUrl: getUrl("appearence"), index: 1, name: "Appearence" },
  { iconUrl: getUrl("personality"), index: 2, name: "Personality" },
  { iconUrl: getUrl("lore"), index: 3, name: "Lore" },
  { iconUrl: getUrl("lore"), index: 4, name: "Lore" },
  { iconUrl: getUrl("checkout"), index: 5, name: "Checkout" }
];

const NewCharacter = () => {
  useUserRoute();
  const [state, setState] = useSessionStorage("character", initialState);
  const [activeSize, formProps, reset] = useRememberResizableForm();
  const handleAction = (n: number) => {
    formProps.setIndex(n);
  };
  const resetState = () => {
    reset();
    setState(initialState);
  };
  return (
    <NewCharacterContext.Provider value={{ state, setState, resetState }}>
      <NewCharacterBackground>
        <RowLayout center isFull={false}>
          <SizeableContainer {...formProps}>
            <BasicInformationForm
              {...formProps}
              onResize={formProps.handleSize(0)}
            />
            <SteticInformationForm
              {...formProps}
              onResize={formProps.handleSize(1)}
            />
            <PersonalityForm
              {...formProps}
              onResize={formProps.handleSize(2)}
            />
            <LoreForm {...formProps} onResize={formProps.handleSize(3)} />
            <AttributesForm {...formProps} onResize={formProps.handleSize(4)} />
            <ConfirmForm {...formProps} onResize={formProps.handleSize(5)} />
            {/* 
            <LoreForm {...formProps} onResize={formProps.handleSize(2)} />
            <ConfigForm {...formProps} onResize={formProps.handleSize(3)} />
            <RoomConfigForm {...formProps} onResize={formProps.handleSize(4)} />
            <ConfirmForm {...formProps} onResize={formProps.handleSize(5)} />
          */}
            <FetchForm {...formProps} onResize={formProps.handleSize(6)} />
          </SizeableContainer>
          <Stepper
            activeIndex={formProps.index}
            action={handleAction}
            steps={steps}
          />
        </RowLayout>
      </NewCharacterBackground>
    </NewCharacterContext.Provider>
  );
};

export default NewCharacter;
