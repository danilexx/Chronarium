import * as Yup from "yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import usePopup from "-/src/utils/hooks/usePopup";
import { PopupBody, PopupHead, Title } from "-/src/utils/hooks/usePopup/styles";
import { Container } from "./styles";
import { BaseForm } from "-/src/components/Form";
import Input from "-/src/components/Input";
import Textarea from "-/src/components/Input/textarea";
import Select from "-/src/components/Input/select";
import ImageDrop from "-/src/components/ImageDrop";
import { FormHeader } from "-/src/components/shared/form";
import { LoadingButton } from "-/src/components/Button";
import { updateItem, uploadImage } from "-/src/services";
import { AdventureContext } from "-/src/components/MasteringAdventure";
import { getPush } from "-/src/components/MasteringAdventure/utils";
import useAwait from "-/src/utils/hooks/useAwait";
import getFileFormDataFromImageUri from "-/src/utils/getFileFormDataFromImageUri";
import SkillsSelector from "-/src/components/SkillsSelector";

const updateItemValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  skills: Yup.array(Yup.number()).required("You must have at least one skill"),
  main_attribute: Yup.string().required("Required"),
  main_attribute_value: Yup.string().required("Required")
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

const UpdateItemPopup = ({ item, methods, cb }) => {
  const formMethods = useForm({
    defaultValues: item,
    validationSchema: updateItemValidationSchema
  });
  React.useEffect(() => {
    const { setValue } = formMethods;
    Object.entries(item).forEach(([key, value]) => {
      if (key === "main_attribute") {
        setValue(
          key,
          attributes.find(e => e.value === value)
        );
      } else setValue(key, value);
    });
  }, [item]);
  const mainAttribute = formMethods.watch("main_attribute");
  const [Popup] = usePopup("base");
  const { adventure } = React.useContext(AdventureContext);
  const [isUploading, upload, { toggle: toggleUploading }] = useAwait(
    uploadImage
  );
  const [isLoading, update, { toggle }] = useAwait(
    updateItem(adventure.id, item.id)
  );
  const handleSubmit = async data => {
    data.main_attribute = data.main_attribute.value;
    try {
      let icon_id = item.icon ? item.icon.id : null;
      const hasOldIcon = !!item.icon;
      const hasNewIcon = data.itemIcon && data.itemIcon !== item.icon?.url;
      const areBothEqual = item.icon?.url === data.itemIcon;
      if (hasNewIcon && !areBothEqual) {
        const uploadResponse = await upload(
          getFileFormDataFromImageUri(data.itemIcon)
        );
        icon_id = uploadResponse.data.id;
      }
      const response = await update({ ...data, icon_id });
      if (cb) {
        cb(response.data);
      }
      methods.toggle(false);
    } catch (err) {
      toggleUploading(false);
      toggle(false);
      console.error(err);
    }
  };
  return (
    <Popup {...methods}>
      <PopupHead>
        <Title>Update Item</Title>
      </PopupHead>
      <PopupBody>
        <FormHeader>Item Creation</FormHeader>
        <BaseForm methods={formMethods} onSubmit={handleSubmit}>
          <ImageDrop
            defaultValue={item.icon && item.icon.url}
            name="itemIcon"
          />
          <Input name="name" />
          <Textarea name="description" />
          <Select
            portalMenu={false}
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

          <SkillsSelector
            defaultValue={item.skills}
            name="skills"
            adventureId={adventure.id}
            popupOptions={{ closeOnPopupClick: true }}
          />
          <LoadingButton
            type="submit"
            isFull
            loading={isLoading || isUploading}
          >
            Update
          </LoadingButton>
        </BaseForm>
      </PopupBody>
    </Popup>
  );
};

export default UpdateItemPopup;
