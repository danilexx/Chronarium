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
  Props
} from "./types";
import {
  BasePopup,
  ErrorPopup,
  InfoPopup,
  addFriend,
  FieldPopup
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
    default: {
      return BasePopup;
    }
  }
};
function usePopup(popupType: "info"): [React.FC<Props & InfoProps>, Options];
function usePopup(popupType: "error"): [React.FC<Props & ErrorProps>, Options];
function usePopup(popupType: "base"): [React.FC<Props>, Options];
function usePopup(popupType: "addFriend"): [React.FC<Props>, Options];
function usePopup(popupType: "field"): [React.FC<Props & FieldProps>, Options];
function usePopup(popupType: PopupTypes = "base"): any {
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
