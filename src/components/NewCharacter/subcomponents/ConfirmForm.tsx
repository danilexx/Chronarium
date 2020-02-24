import React, { useContext } from "react";
import { NewCharacterContext } from "../index";
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
import usePopup from "-/src/utils/hooks/usePopup";

const blackList: string[] = ["characterIcon"];
const columnKeys: string[] = ["lore", "personality", "appearence"];

const columnedKeys = (key: string): boolean => columnKeys.some(e => e === key);
const filterValues = ([key, value]: [string, any]): boolean => {
  if (blackList.some(e => e === key)) {
    return false;
  }
  return true;
};

const requiredKeys = [
  "name",
  "age",
  "height",
  "gender",
  "race",
  "appearance",
  "lore",
  "personality"
];

const ConfirmForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewCharacterContext);
  const [Popup, popupProps] = usePopup("error");
  const confirm = async () => {
    const errorKeys: string[] = [];
    Object.entries(state).forEach(([key, value]: [string, any]) => {
      if (requiredKeys.some(e => e === key) && value === "") {
        errorKeys.push(key);
      }
    });
    if (errorKeys.length > 0) {
      popupProps.show(
        errorKeys
          .map(key => `Error: ${beautifyCamelCase(key)} is required \n`)
          .reduce((total, current) => total + current, "")
      );
      return;
    }

    // setState((initialData: any) => ({ ...initialData, ...data }));
    setIndex(6);
  };

  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Checkout Character</FormHeader>
      {/* <Form defaultValues={state} onSubmit={onSubmit as any}> */}
      {Object.entries(state)
        .filter(filterValues)
        .map(([key, value]) => (
          <StateRow column={columnedKeys(key)} key={key}>
            <Key>{beautifyCamelCase(key)}:</Key>
            <Value>{value}</Value>
          </StateRow>
        ))}
      <Buttons>
        <LoadingButton onClick={confirm} isFull instance="primary">
          Create
        </LoadingButton>
      </Buttons>
      <Popup title="Error Required Fields" {...popupProps} />
      {/* </Form> */}
    </MainForm>
  );
};

export default ConfirmForm;
