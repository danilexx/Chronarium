import { useKey } from "react-use";
import { Props, InfoProps } from "../types";
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
import Field from "./field";

const InfoPopup: React.FC<Props & InfoProps> = ({
  message,
  callback,
  ...props
}) => {
  const { toggle } = props;
  const [error, setError] = React.useState("");
  const mainFieldRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, fetch, { toggle: toggleLoading }] = useAwait(
    async ({ username }) => {
      const response = await addFriend({ username });
      return response;
    }
  );
  const { isOn } = props;
  React.useEffect(() => {
    if (isOn && mainFieldRef && mainFieldRef.current) {
      mainFieldRef.current.focus();
    }
  }, [isOn]);
  const send = async username => {
    try {
      const response = await fetch({ username });
      setError("");
      toggle(false);
    } catch (err) {
      setError(`User with username "${username}" not found`);
      toggleLoading(false);
    }
  };

  return (
    <Field
      {...props}
      errorMessage={error}
      fieldName="username"
      callback={username => {
        send(username);
      }}
      isLoading={isLoading}
      buttonText="Add"
      message="Username: "
      title="Add Friend"
    />
  );
};

export default InfoPopup;
