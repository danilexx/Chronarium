import { useRouter } from "next/router";
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
  const router = useRouter();
  const route = "/mastering/[adventureId]/[step]";
  const as = `/mastering/${router.query.adventureId}/create-skill`;
  function goToCreateSkill() {
    router.push(route, as || route, { shallow: true });
  }
  return (
    <Container>
      <SkillRow onClick={goToCreateSkill}>
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
