import React from "react";
import { MainForm, FormHeader } from "-/src/components/shared/form";
import Input from "-/src/components/Input";
import { Buttons } from "../../Button/styles";
import Button from "../../Button";
import { FormProps } from "-/src/components/shared/types";
import Form from "-/src/components/Form";
import useOnResize from "-/src/utils/hooks/useOnResize";
import Textarea from "../../Input/textarea";
import ImageDrop from "../../ImageDrop";

const ConfigForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const onSubmit = async (data: any) => {
    console.log(data);
    setIndex(4);
  };
  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Criar Mestre</FormHeader>
      <Form onSubmit={onSubmit}>
        <Input name="initialGold" prettyName="Initial Gold" />
        <Input name="attributesMinimum" prettyName="Minimun Attributes Points" />
        <Input name="attributesPointsToSpend" prettyName="Attributes Points To Spend" />
        <Input name="baseLife" prettyName="Base Life Points" />
        <Input name="baseMana" prettyName="Base Mana Points" />
        <Input name="baseExperience" prettyName="Base Experience Points" />
        <Input name="otherExperiences" prettyName="Other Experiences Points" />
        <Buttons>
          <Button type="submit" isFull instance="primary">
            Finish
          </Button>
        </Buttons>
      </Form>
    </MainForm>
  );
};

export default ConfigForm;
