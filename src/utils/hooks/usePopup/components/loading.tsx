import { Props } from "../types";
import Popup from "./base";
import { PopupBody } from "../styles";

const LoadingPopup: React.FC<Props> = props => {
  return (
    <Popup {...props}>
      <PopupBody>Loading...</PopupBody>
    </Popup>
  );
};

export default LoadingPopup;
