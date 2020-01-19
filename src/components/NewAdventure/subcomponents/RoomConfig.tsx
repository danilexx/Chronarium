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

const RoomConfigForm: React.FC<FormProps> = ({ setIndex, index, onResize }) => {
  const ref = useOnResize(onResize);
  const { setState, state } = useContext(NewAdventureContext);
  const onSubmit = async (data: any) => {
    console.log(data);
    setIndex(5);
  };
  return (
    <MainForm ref={ref} index={index}>
      <FormHeader>Room Configuration</FormHeader>
      <Form defaultValues={state} onSubmit={onSubmit}>
        <Input
          name="maxPlayersQuantity"
          prettyName="Max Players Quantity"
          type="number"
          min={1}
          max={10}
        />
        <Input
          name="roomPassword"
          prettyName="Adventure Room Password"
          optional
          type="password"
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

export default RoomConfigForm;
