import { useList } from "react-use";
import { Props, InfoProps, SelectSkillProps } from "../types";
import Popup from "./base";
import { PopupHead, Title, Message, PopupBody, Buttons } from "../styles";
import Button from "-/src/components/Button";
import useAwait from "-/src/utils/hooks/useAwait";
import SkillCard from "-/src/components/SkillCard";
import { getSkills } from "-/src/services";

const popup: React.FC<Props & SelectSkillProps> = ({
  callback,
  adventureId,
  selectedSkills,
  ...props
}) => {
  const { toggle } = props;
  const [skills, { set }] = useList<any>([]);
  const [isLoading, fetch, { toggle: toggleLoading }] = useAwait(
    getSkills(adventureId)
  );
  React.useEffect(() => {
    const getAsync = async () => {
      try {
        const response = await fetch();
        set(response.data);
      } catch (err) {
        toggleLoading(false);
        toggle(false);
        console.error(err);
      }
    };
    getAsync();
  }, []);
  const handleCallback = skill => () => {
    if (callback) {
      callback(skill);
    }
    toggle(false);
  };
  const filteredSkills = React.useMemo(
    () =>
      skills.filter(
        skill => !(selectedSkills && selectedSkills.some(e => e === skill.id))
      ),
    [skills, selectedSkills]
  );
  const handleOk = () => {
    toggle(false);
  };
  return (
    <Popup {...props}>
      <PopupHead>
        <Title>Select an skill below:</Title>
      </PopupHead>
      <PopupBody>
        {filteredSkills.length > 0 ? (
          filteredSkills.map(skill => (
            <SkillCard
              skill={skill}
              onClick={handleCallback(skill)}
              key={skill.id}
            />
          ))
        ) : (
          <Message>
            There aren't any skills avaible{" "}
            <Buttons>
              <Button onClick={handleOk}>Ok</Button>
            </Buttons>
          </Message>
        )}
      </PopupBody>
    </Popup>
  );
};

export default popup;
