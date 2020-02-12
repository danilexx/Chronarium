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

const SkillCard = ({ skill, attributes = [], textStyle, ...props }) => {
  const { name, type, value, mana_cost, icon } = skill;
  return (
    <SkillRow {...props}>
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
  );
};

export default SkillCard;
