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

const InfoPopup: React.FC<Props & InfoProps> = ({
  title,
  message,
  callback,
  ...props
}) => {
  const { toggle } = props;
  const [isLoading, fetch, { toggle: toggleLoading }] = useAwait(
    async username => {
      const response = await addFriend({ username });
      return response;
    }
  );

  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  return (
    <Popup {...props}>
      <PopupHead>
        <Title>Add Friend</Title>
      </PopupHead>
      <PopupBody>
        <Message>
          Username:{" "}
          <StyledInput
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
          {error !== "" && <Error>{error}</Error>}
        </Message>
        <Buttons>
          <LoadingButton
            loading={isLoading}
            onClick={async () => {
              try {
                const response = await fetch({ username });
                setUsername("");
                setError("");
                toggle(false);
              } catch (err) {
                setError(`User with username "${username}" not found`);
                toggleLoading(false);
              }
            }}
          >
            Add
          </LoadingButton>
        </Buttons>
      </PopupBody>
    </Popup>
  );
};

export default InfoPopup;
