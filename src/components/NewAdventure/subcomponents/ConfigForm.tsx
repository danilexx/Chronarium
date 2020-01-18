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

const ConfigForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewAdventureContext);
  const onSubmit = async (data: any) => {
    console.log(data);
    setIndex(4);
  };
  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Adventure Configuration</FormHeader>
      <Form defaultValues={state} onSubmit={onSubmit}>
        <Input name="initialGold" prettyName="Initial Gold" type="number" />
        <Input
          name="attributesMinimum"
          prettyName="Minimun Attributes Points"
          type="number"
        />
        <Input
          name="attributesPointsToSpend"
          prettyName="Attributes Points To Spend"
          type="number"
        />
        <Input name="baseLife" prettyName="Base Life Points" type="number" />
        <Input name="baseMana" prettyName="Base Mana Points" type="number" />
        <Input
          name="baseExperience"
          prettyName="Base Experience Points"
          type="number"
        />
        <Input
          name="otherExperiences"
          prettyName="Other Experiences Points"
          type="number"
        />
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
