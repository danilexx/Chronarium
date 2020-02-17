import * as Yup from "yup";
import { useRouter } from "next/router";
import { Container } from "./styles";
import Form from "-/src/components/Form";
import Input from "-/src/components/Input";
import Textarea from "-/src/components/Input/textarea";
import Select from "-/src/components/Input/select";
import ImageDrop from "-/src/components/ImageDrop";
import { FormHeader } from "-/src/components/shared/form";
import { LoadingButton } from "-/src/components/Button";
import { createSkill, uploadImage } from "-/src/services";
import { AdventureContext } from "-/src/components/MasteringAdventure";
import { getPush } from "-/src/components/MasteringAdventure/utils";
import useAwait from "-/src/utils/hooks/useAwait";
import getFileFormDataFromImageUri from "-/src/utils/getFileFormDataFromImageUri";

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
  const router = useRouter();
  const [isUploading, upload, { toggle: toggleUploading }] = useAwait(
    uploadImage
  );
  const [isLoading, create, { toggle }] = useAwait(createSkill(adventure.id));

  const handleSkillCreation = async data => {
    data.type = data.type.value;
    try {
      let icon_id: null | number = null;
      if (data.skillIcon) {
        const uploadResponse = await upload(
          getFileFormDataFromImageUri(data.skillIcon)
        );
        icon_id = uploadResponse.data.id;
      }
      const response = await create({ ...data, icon_id });
      getPush(router)("/skills");
    } catch (err) {
      toggle(false);
      toggleUploading(false);
      console.error(err);
    }
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
        <LoadingButton type="submit" isFull loading={isLoading || isUploading}>
          Create
        </LoadingButton>
      </Form>
    </Container>
  );
};

export default CreateSkill;
