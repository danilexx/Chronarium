import React, { useContext, useEffect, useState, useRef } from "react";
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
import usePopup from "-/src/utils/hooks/usePopup";
import Tasker from "../../Tasker";

const blackList: string[] = ["masterIcon", "adventureIcon"];
const columnKeys: string[] = ["adventureLore", "adventureDescription"];

const columnedKeys = (key: string): boolean => columnKeys.some(e => e === key);
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

const requiredKeys = [
  "adventureName",
  "masterName",
  "adventureLore",
  "initialGold",
  "attributesMinimum",
  "attributesPointsToSpend",
  "baseLife",
  "baseMana",
  "baseExperience",
  "otherExperiences",
  "maxPlayersQuantity"
];

const tasks = [
  { label: "Creating Master" },
  { label: "Creating Adventure" },
  { label: "Creating Configurations" },
  { label: "Creating Room" },
  { label: "Finishing Up" }
];

const FetchForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewAdventureContext);
  const [Popup, popupProps] = usePopup("error");
  const [activeTask, setActiveTask] = useState(0);
  const interval: any = useRef();
  const start = () => {
    interval.current = setInterval(() => {
      setActiveTask(currentTask => currentTask + 1);
    }, 2000);
  };
  useEffect(() => {
    if (index === 6) {
      start();
    }
  }, [index]);
  return (
    <MainForm ref={ref} index={index}>
      {/* <Form defaultValues={state} onSubmit={onSubmit as any}> */}
      <Tasker activeTask={activeTask} tasks={tasks} />
      {/* <Popup title="Error Required Fields" {...popupProps} /> */}
      {/* </Form> */}
    </MainForm>
  );
};

export default FetchForm;
