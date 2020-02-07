import {
  Container,
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

const Skills = () => {
  return (
    <Container>
      <SkillRow>
        <PlusButton />
      </SkillRow>
      {[...Array(3)].map((e, index) => (
        <SkillRow>
          <SkillImage />
          <SkillName>Quick Attack</SkillName>
          <FixedInfo>
            <Info>
              Pierce
              <DamageTypeIcon />
            </Info>
            <Info>
              150
              <DamageIcon />
            </Info>
            <Info>
              15
              <ManaIcon />
            </Info>
          </FixedInfo>
        </SkillRow>
      ))}
    </Container>
  );
};

export default Skills;
