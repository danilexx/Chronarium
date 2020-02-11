import { useRouter } from "next/router";
import { useList } from "react-use";
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
import useAwait from "-/src/utils/hooks/useAwait";
import { getSkills } from "-/src/services";
import { getPush } from "-/src/components/MasteringAdventure/utils";

const Skills = () => {
  const router = useRouter();
  const { adventureId } = router.query;
  const [skills, { set }] = useList([]);
  const [isLoading, fetch, { toggle }] = useAwait(getSkills(adventureId));
  React.useEffect(() => {
    console.log("carreguei fds");
    const getAsync = async () => {
      try {
        const response = await fetch();
        console.log(response.data);
        set(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAsync();
  }, []);
  function goToCreateSkill() {
    getPush(router)("/create-skill");
  }
  return (
    <Container>
      <SkillRow onClick={goToCreateSkill}>
        <PlusButton />
      </SkillRow>
      {skills.length > 0 &&
        skills.map((skill, index) => {
          const { name, type, value, mana_cost } = skill;
          return (
            <SkillRow>
              <SkillImage />
              <SkillName>{name}</SkillName>
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
            </SkillRow>
          );
        })}
    </Container>
  );
};

export default Skills;
