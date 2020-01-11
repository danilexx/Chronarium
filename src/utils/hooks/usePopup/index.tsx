import {
  useToggle,
  useTimeoutFn,
  useWindowSize,
  useClickAway,
  useKey
} from "react-use";
import { Options, PopupTypes, ErrorProps, InfoProps, Props } from "./types";
import { BasePopup, ErrorPopup, InfoPopup } from "./components";

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
    default: {
      return BasePopup;
    }
  }
};
function usePopup(popupType: "info"): [React.FC<Props & InfoProps>, Options];
function usePopup(popupType: "error"): [React.FC<Props & ErrorProps>, Options];
function usePopup(popupType: "base"): [React.FC<Props>, Options];
function usePopup(popupType: PopupTypes = "base"): any {
  const [isOn, toggle] = useToggle(false);
  const options: Options = {
    isOn,
    toggle
  };

  return [SelectPopup(popupType), options];
}

export default usePopup;
