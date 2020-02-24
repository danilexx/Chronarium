import { useFormContext } from "react-hook-form";
import Input from "-/src/components/Input";

const MainAttributeValueInput = () => {
  const { watch } = useFormContext();
  const mainAttribute = watch("main_attribute").label;
  return (
    <Input
      name="main_attribute_value"
      max={999}
      type="number"
      prettyName={`Required ${mainAttribute} to Equip`}
    />
  );
};

export default MainAttributeValueInput;
