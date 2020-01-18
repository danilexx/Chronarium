import React, { useContext } from "react";
import { NewAdventureContext } from "../index";
import { MainForm, FormHeader } from "-/src/components/shared/form";
import { StateRow, Key, Value } from "../styles";
import { Buttons } from "../../Button/styles";
import Button, { LoadingButton } from "../../Button";
import { FormProps } from "-/src/components/shared/types";
import Form from "-/src/components/Form";
import useOnResize from "-/src/utils/hooks/useOnResize";
import Textarea from "../../Input/textarea";
import ImageDrop from "../../ImageDrop";
import beautifyCamelCase from "-/src/utils/beautifyCamelCase";

const blackList: string[] = ["masterIcon", "adventureIcon"];

const filterValues = ([key, value]: [string, any]): boolean => {
  if (blackList.some(e => e === key)) {
    return false;
  }
  return true;
};

interface FormData {
  adventureName: string;
  adventureDescription: string;
  adventureIcon: string;
}

const ConfirmForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewAdventureContext);
  const confirm = async () => {
    console.log(state);
    // setState((initialData: any) => ({ ...initialData, ...data }));
    // setIndex(1);
  };

  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Checkout Adventure</FormHeader>
      {/* <Form defaultValues={state} onSubmit={onSubmit as any}> */}
      {Object.entries(state)
        .filter(filterValues)
        .map(([key, value]) => (
          <StateRow column={key === "adventureLore"} key={key}>
            <Key>{beautifyCamelCase(key)}:</Key>
            <Value>{value}</Value>
          </StateRow>
        ))}
      <Buttons>
        <LoadingButton onClick={confirm} isFull instance="primary">
          Create
        </LoadingButton>
      </Buttons>
      {/* </Form> */}
    </MainForm>
  );
};

export default ConfirmForm;
