import {
  useToggle,
  useTimeoutFn,
  useWindowSize,
  useClickAway,
  useKey
} from "react-use";
import { useState } from "react";
import {
  Options,
  PopupTypes,
  ErrorProps,
  InfoProps,
  FieldProps,
  SelectSkillProps,
  Props
} from "./types";
import {
  BasePopup,
  ErrorPopup,
  InfoPopup,
  addFriend,
  FieldPopup,
  SelectSkillPopup,
  AdventurePassword,
  LoadingPopup
} from "./components";

const SelectPopup = (type: string) => {
  switch (type) {
    case "error": {
      return ErrorPopup;
    }
    case "base": {
      return BasePopup;
    }
    case "info": {
      return InfoPopup;
    }
    case "addFriend": {
      return addFriend;
    }
    case "field": {
      return FieldPopup;
    }
    case "selectSkill": {
      return SelectSkillPopup;
    }
    case "loading": {
      return LoadingPopup;
    }
    case "adventurePassword": {
      return AdventurePassword;
    }
    default: {
      return BasePopup;
    }
  }
};
function usePopup(
  popupType: "adventurePassword"
): [React.FC<Props & { adventureId?: number }>, Options];
function usePopup(popupType: "info"): [React.FC<Props & InfoProps>, Options];
function usePopup(popupType: "error"): [React.FC<Props & ErrorProps>, Options];
function usePopup(popupType: "base"): [React.FC<Props>, Options];
function usePopup(popupType: "loading"): [typeof LoadingPopup, Options];
function usePopup(popupType: "addFriend"): [React.FC<Props>, Options];
function usePopup(popupType: "field"): [React.FC<Props & FieldProps>, Options];
function usePopup(
  popupType: "selectSkill"
): [React.FC<Props & SelectSkillProps>, Options];
function usePopup(popupType: PopupTypes = "base") {
  const [isOn, toggle] = useToggle(false);
  const [message, setMessage] = useState("");
  const show = (newMessage: string) => {
    setMessage(newMessage);
    toggle(true);
  };
  const options: Options = {
    isOn,
    toggle,
    show,
    message
  };

  return [SelectPopup(popupType), options];
}

export default usePopup;
