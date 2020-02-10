import * as Yup from "yup";
import { Container } from "./styles";
import Form from "-/src/components/Form";
import Input from "-/src/components/Input";
import Textarea from "-/src/components/Input/textarea";
import Select from "-/src/components/Input/Select";
import ImageDrop from "-/src/components/ImageDrop";
import { FormHeader } from "-/src/components/shared/form";
import { LoadingButton } from "-/src/components/Button";
import { createSkill } from "-/src/services";
import { AdventureContext } from "-/src/components/MasteringAdventure";

const CreateSkillValidationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  value: Yup.string().required(),
  mana_cost: Yup.string().required()
});
const damageTypes = [
  {
    value: "regular",
    label: "Regular"
  },
  {
    value: "thrust",
    label: "Thrust"
  },
  {
    value: "strike",
    label: "Strike"
  },
  {
    value: "slash",
    label: "Slash"
  },

  {
    value: "magic",
    label: "Magic"
  },
  {
    value: "miracle",
    label: "Miracle"
  }
];

const CreateSkill = () => {
  const { adventure } = React.useContext(AdventureContext);
  const handleSkillCreation = async data => {
    data.type = data.type.value;
    const response = await createSkill(adventure.id)(data);
    console.log(data);
  };

  return (
    <Container>
      <FormHeader>Skill Creation</FormHeader>
      <Form
        onSubmit={handleSkillCreation}
        validationSchema={CreateSkillValidationSchema}
      >
        <ImageDrop name="skillIcon" />
        <Input name="name" />
        <Textarea name="description" />
        <Select
          name="type"
          prettyName="Damage Type"
          defaultValue={damageTypes[0]}
          options={damageTypes}
        />
        <Input
          name="value"
          max={99999}
          step="0.01"
          type="number"
          prettyName="Damage Value"
        />
        <Input
          name="mana_cost"
          max={99999}
          step="0.01"
          type="number"
          prettyName="Mana Cost"
        />
        <LoadingButton type="submit" isFull loading={false}>
          Create
        </LoadingButton>
      </Form>
    </Container>
  );
};

export default CreateSkill;
