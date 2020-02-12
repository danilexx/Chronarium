import { useRouter } from "next/router";
import { useList } from "react-use";

import { Portal } from "react-portal";
import {
  Container,
  Row,
  PlusButton,
  Tooltip,
  SkillMenu,
  SkillMenuItem
} from "./styles";
import SkillCard from "-/src/components/SkillCard";
import useAwait from "-/src/utils/hooks/useAwait";
import { getSkills } from "-/src/services";
import { getPush } from "-/src/components/MasteringAdventure/utils";

const Skills = () => {
  const router = useRouter();
  const { adventureId } = router.query;
  const [skills, { set, updateAt }] = useList([]);
  const [isLoading, fetch, { toggle }] = useAwait(getSkills(adventureId));
  const toggleMenu = currentIndex => {
    const currentSkill = skills[currentIndex];
    const currentCondition = currentSkill.isMenuShowed;
    set(data => data.map(e => ({ ...e, isMenuShowed: false })));
    updateAt(currentIndex, {
      ...currentSkill,
      isMenuShowed: !currentCondition
    });
    console.log(skills);
  };
  React.useEffect(() => {
    const getAsync = async () => {
      try {
        const response = await fetch();
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
      <Row onClick={goToCreateSkill}>
        <PlusButton />
      </Row>
      {skills.map((skill, index) => (
        <>
          <SkillCard
            onClick={() => toggleMenu(index)}
            data-tip
            skill={skill}
            key={skill.id}
          />
          {skill.isMenuShowed && (
            <SkillMenu>
              <SkillMenuItem>Update</SkillMenuItem>
              <SkillMenuItem delete>Delete</SkillMenuItem>
            </SkillMenu>
          )}
          {index === 0 && (
            <Portal>
              <Tooltip
                multline
                // clickable
                place="top"
                // event="click"
                effect="solid"
              >
                Hello <br />
                Hello <br />
                Hello <br />
              </Tooltip>
            </Portal>
          )}
        </>
      ))}
    </Container>
  );
};

export default Skills;
