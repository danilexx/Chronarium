import { useRouter } from "next/router";
import { useList } from "react-use";
import UpdateSkillPopup from "./UpdateSkillPopup";
import { Container, Row, PlusButton, SkillMenu, SkillMenuItem } from "./styles";
import SkillCard from "-/src/components/SkillCard";
import useAwait from "-/src/utils/hooks/useAwait";
import { getSkills, deleteSkill } from "-/src/services";
import { getPush } from "-/src/components/MasteringAdventure/utils";
import usePopup from "-/src/utils/hooks/usePopup";

const Skills = () => {
  const [, methods] = usePopup("base");
  const router = useRouter();
  const { adventureId: advId } = router.query;
  const adventureId = Number(advId);
  const [skills, { set, updateAt, removeAt }] = useList<any>([]);
  const [isLoading, fetch, { toggle }] = useAwait(getSkills(adventureId));
  const toggleMenu = currentIndex => {
    const currentSkill = skills[currentIndex];
    const currentCondition = currentSkill.isMenuShowed;
    set(data => data.map(e => ({ ...e, isMenuShowed: false })));
    updateAt(currentIndex, {
      ...currentSkill,
      isMenuShowed: !currentCondition
    });
  };
  const handleCallback = React.useCallback(
    updatedSkill => {
      const desiredIndex = skills.findIndex(e => e.id === updatedSkill.id);
      updateAt(desiredIndex, updatedSkill);
    },
    [skills]
  );
  const [updateSkill, setUpdateSkill] = React.useState({});
  const handleUpdate = (skill, index) => {
    methods.toggle(true);
    setUpdateSkill(skill);
  };
  const handleDelete = async (id, index) => {
    removeAt(index);
    await deleteSkill(adventureId, id)();
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
            skill={skill}
            key={skill.id}
          />
          {skill.isMenuShowed && (
            <SkillMenu>
              <SkillMenuItem onClick={() => handleUpdate(skill, index)}>
                Update
              </SkillMenuItem>
              <SkillMenuItem
                delete
                onClick={() => handleDelete(skill.id, index)}
              >
                Delete
              </SkillMenuItem>
            </SkillMenu>
          )}
        </>
      ))}
      <UpdateSkillPopup
        skill={updateSkill}
        cb={handleCallback}
        methods={methods}
      />
    </Container>
  );
};

export default Skills;
