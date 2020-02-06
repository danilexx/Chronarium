import { useKey } from "react-use";
import { Props, FieldProps } from "../types";
import Popup from "./base";
import {
  PopupHead,
  Title,
  Message,
  PopupBody,
  Buttons,
  StyledInput,
  Error
} from "../styles";
import { LoadingButton } from "-/src/components/Button";
import useAwait from "-/src/utils/hooks/useAwait";
import { addFriend } from "-/src/services";

const Field: React.FC<FieldProps & Props> = ({
  message,
  errorMessage,
  isLoading,
  fieldName,
  title,
  buttonText,
  callback,
  ...props
}) => {
  const { isOn } = props;
  const mainFieldRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (isOn && mainFieldRef && mainFieldRef.current) {
      mainFieldRef.current.focus();
    }
  }, [isOn]);
  const [field, setField] = React.useState("");
  const send = () => {
    if (callback) {
      callback(field);
    }
  };
  useKey("Enter", send, undefined, [field]);
  return (
    <Popup {...props}>
      <PopupHead>
        <Title>{title}</Title>
      </PopupHead>
      <PopupBody>
        <Message>
          {message}
          <StyledInput
            ref={mainFieldRef}
            value={field}
            onChange={e => {
              setField(e.target.value);
            }}
            placeholder={fieldName}
          />
          {errorMessage !== "" && <Error>{errorMessage}</Error>}
        </Message>
        <Buttons>
          <LoadingButton loading={isLoading} onClick={send}>
            {buttonText}
          </LoadingButton>
        </Buttons>
      </PopupBody>
    </Popup>
  );
};

export default Field;
