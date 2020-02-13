import { Portal } from "react-portal";
import Tooltip from "-/src/components/Tooltip";
import {
  SkillRow,
  SkillImage,
  SkillName,
  FixedInfo,
  PlusButton,
  Info,
  ManaIcon,
  DamageIcon,
  DamageTypeIcon
} from "./styles";
import { SkillTooltip } from "-/src/components/tooltips";

interface Props {
  attributes: string[];
  textStyle: any;
  skill: any;
}
const SkillCard: React.FC<any> = ({
  skill,
  attributes = [],
  textStyle = {},
  ...props
}) => {
  const { name, type, value, mana_cost, icon } = skill;
  return (
    <>
      <SkillRow data-tip data-for={`skill:${skill.id}`} {...props}>
        <SkillImage src={icon ? icon.url : "/images/skill.svg"} />
        <SkillName style={textStyle}>{name}</SkillName>
        {attributes[0] === "name" || (
          <FixedInfo>
            <Info>
              {type}
              <DamageTypeIcon />
            </Info>
            <Info>
              {value}
              <DamageIcon />
            </Info>
            <Info>
              {mana_cost}
              <ManaIcon />
            </Info>
          </FixedInfo>
        )}
      </SkillRow>
      <Portal>
        <Tooltip
          multline
          id={`skill:${skill.id}`}
          // clickable
          place="top"
          // event="click"
          effect="solid"
          getContent={() => <SkillTooltip skill={skill} />}
        />
      </Portal>
    </>
  );
};

export default SkillCard;
