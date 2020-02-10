import * as Yup from "yup";
import { Container } from "./styles";
import Form from "-/src/components/Form";
import Input from "-/src/components/Input";
import Textarea from "-/src/components/Input/textarea";
import Select from "-/src/components/Input/Select";
import ImageDrop from "-/src/components/ImageDrop";
import { FormHeader } from "-/src/components/shared/form";
import { LoadingButton } from "-/src/components/Button";

const CreateSkillValidationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  damageValue: Yup.string().required(),
  manaCostValue: Yup.string().required()
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
  return (
    <Container>
      <FormHeader>Skill Creation</FormHeader>
      <Form validationSchema={CreateSkillValidationSchema}>
        <ImageDrop name="skillIcon" />
        <Input name="name" />
        <Textarea name="description" />
        <Select
          name="damagetype"
          prettyName="Damage Type"
          defaultValue={damageTypes[0]}
          options={damageTypes}
        />
        <Input
          name="damageValue"
          max={99999}
          type="number"
          prettyName="Damage Value"
        />
        <Input
          name="manaCostValue"
          max={99999}
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
