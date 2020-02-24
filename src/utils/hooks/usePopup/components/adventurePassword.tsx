import { useKey, useBoolean } from "react-use";
import { useRouter } from "next/router";
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
import { enterPrivateAdventure, getClientAdventure } from "-/src/services";
import InfoPopup from "./info";
import usePopup from "..";
import Field from "./field";
import LoadingPopup from "./loading";

const AdventurePassword: React.FC<Props & { adventureId: number }> = ({
  adventureId,
  ...props
}) => {
  const { toggle, isOn } = props;
  const [error, setError] = React.useState("");
  const router = useRouter();
  const [isLoading, fetch, { toggle: toggleLoading }] = useAwait(
    async ({ password }) => {
      const response = await enterPrivateAdventure(adventureId)({ password });
      return response;
    }
  );
  const [, popupProps] = usePopup("field");
  React.useEffect(() => {
    if (isOn) {
      const fn = async () => {
        try {
          const response = await getClientAdventure(adventureId)();
          router.push(`/adventures/${adventureId}/home`);
        } catch (err) {
          toggle(false);
          popupProps.toggle(true);
        }
      };
      fn();
    }
  }, [isOn]);
  const send = async password => {
    try {
      const response = await fetch({ password });
      setError("");
      toggle(false);
      router.push(`/adventures/${adventureId}/home`);
    } catch (err) {
      setError(`Wrong Password`);
      toggleLoading(false);
    }
  };
  return (
    <>
      <LoadingPopup important isOn={isOn} toggle={toggle} />
      <Field
        {...popupProps}
        errorMessage={error}
        prettyName="Password"
        fieldName="Adventure Password"
        callback={password => {
          send(password);
        }}
        isLoading={isLoading}
        buttonText="Enter"
        message="Adventure Password: "
        title="Enter Password"
        fieldProps={{ type: "password" }}
      />
    </>
  );
};

export default AdventurePassword;
