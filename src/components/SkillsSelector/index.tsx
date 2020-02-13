import { useList } from "react-use";
import { Controller, useFormContext, ErrorMessage } from "react-hook-form";
import {
  Container,
  Plus,
  PlusContainer,
  Title,
  Skills,
  ErrorContainer
} from "./styles";
import usePopup from "-/src/utils/hooks/usePopup";
import SkillCard from "-/src/components/SkillCard";

const BaseSkillsSelector = ({
  adventureId,
  onChange,
  defaultValue = [],
  popupOptions = {}
}) => {
  const [Popup, popupProps] = usePopup("selectSkill");
  const [skills, { set, push, updateAt }] = useList([]);
  const [operation, setOperation] = React.useState("add");
  const [index, setIndex] = React.useState(0);
  const handleAdd = () => {
    setOperation("add");
    popupProps.toggle();
  };
  const handleSelectSkill = skill => {
    if (operation === "add") {
      push(skill);
    } else if (operation === "update") {
      if (skills.some(currentSkill => currentSkill.id === skill.id)) {
        return;
      }
      updateAt(index, skill);
    }
  };
  const updateSelectedSkill = nextIndex => {
    setOperation("update");
    setIndex(nextIndex);
    popupProps.toggle();
  };
  React.useEffect(() => {
    set(defaultValue);
  }, [defaultValue]);
  React.useEffect(() => {
    if (onChange) {
      onChange(skills.map(e => e.id));
    }
  }, [skills]);
  const totalProps = { ...popupProps, ...popupOptions };
  return (
    <Container>
      <Title>Skills</Title>
      <PlusContainer onClick={handleAdd}>
        <Plus />
      </PlusContainer>
      {skills.length > 0 && (
        <Skills>
          {skills.map((skill, skillIndex) => (
            <SkillCard
              style={{ margin: "0.5rem" }}
              textStyle={{ textAlign: "center" }}
              attributes={["name"]}
              skill={skill}
              key={skill.id}
              onClick={() => updateSelectedSkill(skillIndex)}
            />
          ))}
        </Skills>
      )}
      <Popup
        callback={handleSelectSkill}
        adventureId={adventureId}
        selectedSkills={skills.map(e => e.id)}
        {...totalProps}
      />
    </Container>
  );
};

const SkillsSelector = ({ name, defaultValue = [], ...props }) => {
  const { errors, control } = useFormContext();
  return (
    <>
      <Controller
        as={<BaseSkillsSelector defaultValue={defaultValue} />}
        name={name}
        control={control}
        {...props}
      />
      <ErrorContainer>
        <ErrorMessage errors={errors} name={name} />
      </ErrorContainer>
    </>
  );
};

export default SkillsSelector;
