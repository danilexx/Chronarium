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
    setState((initialData: any) => ({ ...initialData, ...data }));
    setIndex(4);
  };
  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Adventure Configuration</FormHeader>
      <Form defaultValues={state} onSubmit={onSubmit}>
        <Input
          name="initialGold"
          max={9999}
          prettyName="Initial Gold"
          type="number"
        />
        <Input
          name="attributesMinimum"
          max={10}
          prettyName="Minimun Attributes Points"
          type="number"
        />
        <Input
          name="attributesPointsToSpend"
          prettyName="Attributes Points To Spend"
          type="number"
        />
        <Input
          name="baseLife"
          min={100}
          max={1000}
          prettyName="Base Life Points"
          type="number"
        />
        <Input
          name="baseMana"
          min={100}
          max={1000}
          prettyName="Base Mana Points"
          type="number"
        />
        <Input
          name="baseExperience"
          min={50}
          max={500}
          prettyName="Base Experience Points"
          type="number"
        />
        <Input
          name="otherExperiences"
          min={50}
          max={500}
          prettyName="Other Experiences Points"
          type="number"
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

export default ConfigForm;
