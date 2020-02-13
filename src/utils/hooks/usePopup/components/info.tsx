import { Props, InfoProps } from "../types";
import Popup from "./base";
import { PopupHead, Title, Message, PopupBody, Buttons } from "../styles";
import Button from "-/src/components/Button";

const InfoPopup: React.FC<Props & InfoProps> = ({
  title,
  message,
  callback,
  ...props
}) => {
  const { toggle } = props;
  const handleOk = () => {
    if (callback) {
      callback();
    }
    toggle(false);
  };
  return (
    <Popup {...props}>
      <PopupHead>
        <Title>{title}</Title>
      </PopupHead>
      <PopupBody>
        <Message>{message}</Message>
        <Buttons>
          <Button onClick={handleOk}>Ok</Button>
        </Buttons>
      </PopupBody>
    </Popup>
  );
};

export default InfoPopup;
