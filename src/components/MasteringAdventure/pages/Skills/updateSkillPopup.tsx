import * as Yup from "yup";
import { useRouter } from "next/router";
import usePopup from "-/src/utils/hooks/usePopup";
import { PopupBody, PopupHead, Title } from "-/src/utils/hooks/usePopup/styles";
import { Container } from "./styles";
import Form from "-/src/components/Form";
import Input from "-/src/components/Input";
import Textarea from "-/src/components/Input/textarea";
import Select from "-/src/components/Input/Select";
import ImageDrop from "-/src/components/ImageDrop";
import { FormHeader } from "-/src/components/shared/form";
import { LoadingButton } from "-/src/components/Button";
import { updateSkill, uploadImage } from "-/src/services";
import { AdventureContext } from "-/src/components/MasteringAdventure";
import { getPush } from "-/src/components/MasteringAdventure/utils";
import useAwait from "-/src/utils/hooks/useAwait";
import getFileFormDataFromImageUri from "-/src/utils/getFileFormDataFromImageUri";

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

const SkillValidationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  value: Yup.string().required(),
  mana_cost: Yup.string().required()
});

const UpdateSkillPopup = ({ skill, methods, cb }) => {
  const [Popup] = usePopup("base");
  const { adventure } = React.useContext(AdventureContext);
  const [isUploading, upload, { toggleUploading }] = useAwait(uploadImage);
  const [isLoading, create, { toggle }] = useAwait(
    updateSkill(adventure.id, skill.id)
  );
  const handleSubmit = async data => {
    data.type = data.type.value;
    try {
      let icon_id = skill.icon ? skill.icon.id : null;
      if (data.skillIcon && skill.icon && skill.icon.url !== data.skillIcon) {
        const uploadResponse = await upload(
          getFileFormDataFromImageUri(data.skillIcon)
        );
        icon_id = uploadResponse.data.id;
      }
      const response = await create({ ...data, icon_id });
      if (cb) {
        cb(response.data);
      }
      methods.toggle(false);
    } catch (err) {
      toggle(false);
      console.error(err);
    }
  };
  return (
    <Popup {...methods}>
      <PopupHead>
        <Title>Update {skill.name}</Title>
      </PopupHead>
      <PopupBody>
        <Form
          onSubmit={handleSubmit}
          defaultValues={{
            ...skill,
            type: damageTypes.find(e => e.value === skill.type)
          }}
          validationSchema={SkillValidationSchema}
        >
          <ImageDrop
            {...(skill.icon ? { defaultValue: skill.icon.url } : {})}
            name="skillIcon"
          />
          <Input name="name" />
          <Textarea name="description" />
          <Select
            portalMenu={false}
            name="type"
            prettyName="Damage Type"
            // defaultValue={damageTypes.find(e => e.value === skill.type)}
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
          <LoadingButton
            type="submit"
            isFull
            loading={isLoading || isUploading}
          >
            Update
          </LoadingButton>
        </Form>
      </PopupBody>
    </Popup>
  );
};

export default UpdateSkillPopup;
