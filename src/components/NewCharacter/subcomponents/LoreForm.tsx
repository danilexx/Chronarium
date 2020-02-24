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
import { loreFormValidationSchema } from "../validationSchemas";

const LoreForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewCharacterContext);
  const onSubmit = async (data: any) => {
    setState((initialData: any) => ({ ...initialData, ...data }));
    setIndex(4);
  };
  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Lore</FormHeader>
      <Form
        validationSchema={loreFormValidationSchema}
        defaultValues={state}
        onSubmit={onSubmit}
      >
        <Textarea rows={8} name="lore" />
        <Buttons>
          <Button type="submit" isFull instance="primary">
            Next
          </Button>
        </Buttons>
      </Form>
    </MainForm>
  );
};

export default LoreForm;