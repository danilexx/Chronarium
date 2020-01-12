import { Props, InfoProps, ErrorProps } from "../types";
import Popup from "./base";
import { PopupHead, Title, Message, PopupBody, Buttons } from "../styles";
import Button from "-/src/components/Button";

const ErrorPopup: React.FC<Props & ErrorProps> = ({
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
    <Popup error {...props}>
      <PopupHead>
        <Title>{title}</Title>
      </PopupHead>
      <PopupBody>
        <Message>{message}</Message>
        <Buttons>
          <Button instance="error" onClick={handleOk}>
            Beleza
          </Button>
        </Buttons>
      </PopupBody>
    </Popup>
  );
};

export default ErrorPopup;
