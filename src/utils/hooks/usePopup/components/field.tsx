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
  // StyledInput,
  Error
} from "../styles";
import { LoadingButton } from "-/src/components/Button";
import useAwait from "-/src/utils/hooks/useAwait";
import { addFriend } from "-/src/services";
import { BaseForm } from "-/src/components/Form";
import Input from "-/src/components/Input";

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
            {message}
            <Input name="field" prettyName={fieldName} />
            {errorMessage !== "" && <Error>{errorMessage}</Error>}
          </Message>
          <Buttons>
            <LoadingButton type="submit" loading={isLoading}>
              {buttonText}
            </LoadingButton>
          </Buttons>
        </PopupBody>
      </BaseForm>
    </Popup>
  );
};

export default Field;
