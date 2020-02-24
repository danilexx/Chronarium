import { useKey } from "react-use";
import { useForm } from "react-hook-form";
import { Props, FieldProps } from "../types";
import Popup from "./base";
import {
  PopupHead,
  Title,
  Message,
  PopupBody,
  Buttons,
  TitleMessage,
  // StyledInput,
  Error
} from "../styles";
import { LoadingButton } from "-/src/components/Button";
import useAwait from "-/src/utils/hooks/useAwait";
import { addFriend } from "-/src/services";
import { BaseForm } from "-/src/components/Form";
import Input from "-/src/components/Input";

const Field: React.FC<FieldProps & Props & { fieldProps?: any }> = ({
  message,
  errorMessage,
  isLoading,
  fieldName,
  title,
  buttonText,
  callback,
  fieldProps,
  ...props
}) => {
  const { isOn } = props;
  const mainFieldRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (isOn && mainFieldRef && mainFieldRef.current) {
      mainFieldRef.current.focus();
    }
  }, [isOn]);
  const { prettyName = "" } = props;
  const methods = useForm();
  const send = data => {
    if (callback) {
      callback(data.field);
    }
  };
  return (
    <Popup {...props}>
      <PopupHead>
        <Title>{title}</Title>
      </PopupHead>
      <BaseForm methods={methods} onSubmit={send}>
        <PopupBody>
          <Message>
            <TitleMessage>{message}</TitleMessage>
            <Input
              name="field"
              prettyName={prettyName !== "" ? prettyName : fieldName}
              {...fieldProps}
            />
            {errorMessage !== "" && <Error>{errorMessage}</Error>}
          </Message>
          <Buttons>
            <LoadingButton isFull type="submit" loading={isLoading}>
              {buttonText}
            </LoadingButton>
          </Buttons>
        </PopupBody>
      </BaseForm>
    </Popup>
  );
};

export default Field;
