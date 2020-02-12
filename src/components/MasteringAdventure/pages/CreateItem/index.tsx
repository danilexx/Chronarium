import * as Yup from "yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Container } from "./styles";
import { BaseForm } from "-/src/components/Form";
import Input from "-/src/components/Input";
import Textarea from "-/src/components/Input/textarea";
import Select from "-/src/components/Input/Select";
import ImageDrop from "-/src/components/ImageDrop";
import { FormHeader } from "-/src/components/shared/form";
import { LoadingButton } from "-/src/components/Button";
import { createItem, uploadImage } from "-/src/services";
import { AdventureContext } from "-/src/components/MasteringAdventure";
import { getPush } from "-/src/components/MasteringAdventure/utils";
import useAwait from "-/src/utils/hooks/useAwait";
import SkillsSelector from "-/src/components/SkillsSelector";
import getFileFormDataFromImageUri from "-/src/utils/getFileFormDataFromImageUri";

const CreateItemValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  skills: Yup.array(Yup.number()).required("You must have at least one skill"),
  main_attribute: Yup.string().required("Required")
});
const attributes = [
  {
    value: "strength",
    label: "Strength"
  },
  {
    value: "agility",
    label: "Agility"
  },
  {
    value: "intelligence",
    label: "Intelligence"
  },
  {
    value: "faith",
    label: "Faith"
  }
];

const CreateItem = () => {
  const methods = useForm();
  const mainAttribute = methods.watch("main_attribute");
  const { adventure } = React.useContext(AdventureContext);
  const router = useRouter();
  const [isUploading, upload, { toggleUploading }] = useAwait(uploadImage);
  const [isLoading, create, { toggle }] = useAwait(createItem(adventure.id));

  const handleItemCreation = async data => {
    data.main_attribute = data.main_attribute.value;
    try {
      let icon_id = null;
      if (data.itemIcon) {
        const uploadResponse = await upload(
          getFileFormDataFromImageUri(data.itemIcon)
        );
        icon_id = uploadResponse.data.id;
      }
      const response = await create({ ...data, type: "weapon", icon_id });
      getPush(router)("/items");
    } catch (err) {
      toggle(false);
      console.error(err);
    }
  };

  return (
    <Container>
      <FormHeader>Item Creation</FormHeader>
      <BaseForm
        methods={methods}
        onSubmit={handleItemCreation}
        validationSchema={CreateItemValidationSchema}
      >
        <ImageDrop name="itemIcon" />
        <Input name="name" />
        <Textarea name="description" />
        <Select
          name="main_attribute"
          prettyName="Main Attribute"
          defaultValue={attributes[0]}
          options={attributes}
        />
        <Input
          name="main_attribute_value"
          max={999}
          type="number"
          prettyName={`Required ${mainAttribute?.label} to Equip`}
        />

        <SkillsSelector name="skills" adventureId={adventure.id} />
        <LoadingButton type="submit" isFull loading={isLoading || isUploading}>
          Create
        </LoadingButton>
      </BaseForm>
    </Container>
  );
};

export default CreateItem;
