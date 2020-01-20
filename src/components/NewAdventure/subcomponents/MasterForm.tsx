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
import { NewAdventureContext } from "..";
import { masterFormValidationSchema } from "../validationSchemas";

const MasterForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewAdventureContext);
  const onSubmit = async (data: any) => {
    setState((initialData: any) => ({ ...initialData, ...data }));
    setIndex(2);
  };
  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Criar Mestre</FormHeader>
      <Form
        validationSchema={masterFormValidationSchema}
        defaultValues={state}
        onSubmit={onSubmit}
      >
        <ImageDrop defaultValue={state.masterIcon} name="masterIcon" />
        <Input name="masterName" prettyName="Master Name" />
        <Buttons>
          <Button type="submit" isFull instance="primary">
            Next
          </Button>
        </Buttons>
      </Form>
    </MainForm>
  );
};

export default MasterForm;
