import { Name, Description } from "./styles";
import {
  FixedInfo,
  DamageTypeIcon,
  Info,
  DamageIcon,
  ManaIcon
} from "-/src/components/SkillCard/styles";

const SkillTooltip = ({ skill }) => {
  if (!skill) return null;
  const { name, description, type, value, mana_cost } = skill;
  return (
    <>
      <Name>{name}</Name>
      <Description>{description}</Description>
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
    </>
  );
};
export default SkillTooltip;
