import { useKey } from "react-use";
import { Props, InfoProps } from "-/src/utils/hooks/usePopup/types";
import Popup from "-/src/utils/hooks/usePopup/components/base";
import {
  PopupHead,
  Title,
  Message,
  PopupBody,
  Buttons,
  StyledInput,
  Error
} from "-/src/utils/hooks/usePopup/styles";
import { LoadingButton } from "-/src/components/Button";
import useAwait from "-/src/utils/hooks/useAwait";
import { addFriend } from "-/src/services";
import Field from "-/src/utils/hooks/usePopup/components/field";

export const MasterName: React.FC<Props & { callback: any }> = ({
  callback,
  ...props
}) => {
  const { toggle } = props;
  const [error, setError] = React.useState("");
  const mainFieldRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, fetch, { toggle: toggleLoading }] = useAwait(callback);
  const { isOn } = props;
  React.useEffect(() => {
    if (isOn && mainFieldRef && mainFieldRef.current) {
      mainFieldRef.current.focus();
    }
  }, [isOn]);
  const send = async master_name => {
    try {
      const response = await fetch({ master_name });
      setError("");
      toggle(false);
    } catch (err) {
      setError(`Error`);
      toggleLoading(false);
    }
  };

  return (
    <Field
      {...props}
      errorMessage={error}
      fieldName="master name"
      callback={name => {
        send(name);
      }}
      isLoading={isLoading}
      buttonText="Enter"
      message="Master Name: "
      title="Enter Adventure as Master"
    />
  );
};
