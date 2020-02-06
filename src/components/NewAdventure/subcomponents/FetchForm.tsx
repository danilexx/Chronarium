import React, { useContext, useEffect, useState, useRef } from "react";
import Router from "next/router";
import { NewAdventureContext } from "../index";
import { createMaster, createAdventure, uploadImage } from "-/src/services";
import { MainForm } from "-/src/components/shared/form";
import { FormProps } from "-/src/components/shared/types";
import useOnResize from "-/src/utils/hooks/useOnResize";
import usePopup from "-/src/utils/hooks/usePopup";
import Tasker from "../../Tasker";
import dataURItoBlob from "-/src/utils/dataURItoBlob";

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
  { label: "Uploading Master's icon" },
  { label: "Creating Master" },
  { label: "Uploading Adventure's icon" },
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
      let masterIconId: null | number = null;
      if (state.masterIcon) {
        const masterIconBlob: any = dataURItoBlob(state.masterIcon);
        const masterIconFormData = new FormData();
        masterIconFormData.append("file", masterIconBlob);
        const response = await uploadImage(masterIconFormData);
        masterIconId = response.data.id;
      }
      nextTask();
      const masterResponse = await createMaster({
        name: state.masterName,
        avatar_id: masterIconId
      });
      nextTask();
      let adventureIconId: null | number = null;
      if (state.adventureIcon) {
        const adventureIconBlob: any = dataURItoBlob(state.adventureIcon);
        const adventureIconFormData = new FormData();
        adventureIconFormData.append("file", adventureIconBlob);
        const response = await uploadImage(adventureIconFormData);
        adventureIconId = response.data.id;
      }
      nextTask();
      const adventureResponse = await createAdventure(masterResponse.data.id)({
        name: state.adventureName,
        password: state.roomPassword,
        description: state.adventureDescription,
        maxPlayers: state.maxPlayersQuantity,
        options: {
          default_mana: state.baseMana,
          default_life: state.baseLife,
          default_gold: state.initialGold,
          default_attributes_points_to_spend: state.attributesPointsToSpend,
          default_base_expertise: state.baseExperience,
          default_melee_expertise: state.otherExperiences,
          default_ranged_expertise: state.otherExperiences,
          default_magic_expertise: state.otherExperiences,
          default_miracle_expertise: state.otherExperiences
        },
        avatar_id: adventureIconId
      });
      nextTask();
      Router.push(`/mastering/${adventureResponse.data.id}/home`);
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
      <Tasker activeTask={activeTask} tasks={tasks} />
    </MainForm>
  );
};

export default FetchForm;
