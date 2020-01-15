import React from "react";
import { MainForm, FormHeader } from "-/src/components/shared/form";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button  from "../../Button";
import { FormProps } from "-/src/components/shared/types";
import Form from "-/src/components/Form";
import useOnResize from "-/src/utils/hooks/useOnResize";

const AdventureForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const onSubmit = async (data: any) => {};
  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Criar Aventura</FormHeader>
      <Form onSubmit={onSubmit}>
        <Input name="adventureName" prettyName="Adventure Name" />
        <Buttons>
          <Button type="submit" isFull instance="primary">
            Continuar
          </Button>
        </Buttons>
      </Form>
    </MainForm>
  );
};

export default AdventureForm;
