import React, { useContext } from "react";
import { MainForm, FormHeader } from "-/src/components/shared/form";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button from "../../Button";
import { FormProps } from "-/src/components/shared/types";
import Form from "-/src/components/Form";
import useOnResize from "-/src/utils/hooks/useOnResize";
import Textarea from "../../Input/textarea";
import ImageDrop from "../../ImageDrop";
import { NewCharacterContext } from "..";
import { steticFormValidationSchema } from "../validationSchemas";

const SteticInformationForm: React.FC<FormProps> = ({
  setIndex,
  index,
  onResize
}) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewCharacterContext);
  const onSubmit = async (data: any) => {
    setState((initialData: any) => ({ ...initialData, ...data }));
    setIndex(2);
  };
  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Appearence & Stetic</FormHeader>
      <Form
        validationSchema={steticFormValidationSchema}
        defaultValues={state}
        onSubmit={onSubmit}
      >
        <Input name="height" max={3} step="0.01" type="number" />
        <Input name="race" />
        <Textarea rows={4} name="appearance" />
        <Buttons>
          <Button type="submit" isFull instance="primary">
            Next
          </Button>
        </Buttons>
      </Form>
    </MainForm>
  );
};

export default SteticInformationForm;
