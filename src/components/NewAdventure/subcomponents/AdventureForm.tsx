import React, { useContext } from "react";
import { NewAdventureContext } from "../index";
import { MainForm, FormHeader } from "-/src/components/shared/form";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button from "../../Button";
import { FormProps } from "-/src/components/shared/types";
import Form from "-/src/components/Form";
import useOnResize from "-/src/utils/hooks/useOnResize";
import Textarea from "../../Input/textarea";
import ImageDrop from "../../ImageDrop";
import { adventureFormValidationSchema } from "../validationSchemas";

interface FormData {
  adventureName: string;
  adventureDescription: string;
  adventureIcon: string;
}

const AdventureForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewAdventureContext);
  const onSubmit = async (data: FormData) => {
    setState((initialData: any) => ({ ...initialData, ...data }));
    setIndex(1);
  };

  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Create Adventure</FormHeader>
      <Form
        validationSchema={adventureFormValidationSchema}
        defaultValues={state}
        onSubmit={onSubmit as any}
      >
        <ImageDrop defaultValue={state.adventureIcon} name="adventureIcon" />
        <Input name="adventureName" prettyName="Adventure Name" />
        <Textarea
          name="adventureDescription"
          prettyName="Adventure Description"
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

export default AdventureForm;
