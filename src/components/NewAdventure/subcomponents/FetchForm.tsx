import React, { useContext, useEffect, useState, useRef } from "react";
import Router from "next/router";
import { NewAdventureContext } from "../index";
import { createMaster, createAdventure } from "-/src/services";
import { MainForm } from "-/src/components/shared/form";
import { FormProps } from "-/src/components/shared/types";
import useOnResize from "-/src/utils/hooks/useOnResize";
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
  { label: "Redirecting..." }
];

const FetchForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state, resetState } = useContext(NewAdventureContext);
  const [Popup, popupProps] = usePopup("error");
  const [activeTask, setActiveTask] = useState(0);
  const interval: any = useRef();
  const nextTask = () => {
    setActiveTask(currentTask => currentTask + 1);
  };
  const start = async () => {
    try {
      const {
        masterName,
        adventureName,
        roomPassword,
        maxPlayersQuantity,
        initialGold,
        attributesMinimum,
        attributesPointsToSpend,
        baseLife,
        baseMana,
        baseExperience,
        otherExperiences
      } = state;
      const masterResponse = await createMaster({
        name: masterName
      });
      nextTask();
      const adventureResponse = await createAdventure(masterResponse.data.id)({
        name: adventureName,
        password: roomPassword,
        maxPlayers: maxPlayersQuantity,
        options: {
          default_mana: baseMana,
          default_life: baseLife,
          default_gold: initialGold,
          default_attributes_points_to_spend: attributesPointsToSpend,
          default_base_experience_value: baseExperience,
          default_melee_experience_value: otherExperiences,
          default_ranged_experience_value: otherExperiences,
          default_magic_experience_value: otherExperiences,
          default_miracle_experience_value: otherExperiences
        }
      });
      nextTask();
      Router.push(`/adventures/${adventureResponse.data.id}`);
      resetState();
    } catch (err) {
      console.error(err);
    }
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
