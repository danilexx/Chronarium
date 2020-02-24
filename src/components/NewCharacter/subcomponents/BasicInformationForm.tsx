import React, { useContext } from "react";
import { NewCharacterContext } from "../index";
import { MainForm, FormHeader } from "-/src/components/shared/form";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button from "../../Button";
import { FormProps } from "-/src/components/shared/types";
import Form from "-/src/components/Form";
import useOnResize from "-/src/utils/hooks/useOnResize";
import Textarea from "../../Input/textarea";
import ImageDrop from "../../ImageDrop";
import { basicInformationValidationSchema } from "../validationSchemas";
import Select from "-/src/components/Input/select";

const genderOptions = [
  {
    label: "Male",
    value: "male"
  },
  {
    label: "Female",
    value: "female"
  }
];
const BasicInformationForm: React.FC<FormProps> = ({
  setIndex,
  index,
  onResize
}) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewCharacterContext);
  const onSubmit = async (data: any) => {
    setState((initialData: any) => ({
      ...initialData,
      name: data.name,
      age: data.age,
      gender: data.genderr ? data.genderr.value : "male"
    }));
    setIndex(1);
  };

  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Create Character</FormHeader>
      <Form
        validationSchema={basicInformationValidationSchema}
        defaultValues={state}
        onSubmit={onSubmit as any}
      >
        <ImageDrop defaultValue={state.characterIcon} name="characterIcon" />
        <Input name="name" />
        <Input name="age" type="number" max={99} />
        <Select
          name="genderr"
          defaultValue={genderOptions.find(e => e.value === state.gender)}
          options={genderOptions}
        />
        <Buttons>
          <Button type="submit" isFull instance="primary">
            Next
          </Button>
        </Buttons>
      </Form>
    </MainForm>
  );
};

export default BasicInformationForm;
