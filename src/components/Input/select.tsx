import React from "react";

import { ErrorMessage, useFormContext, Controller } from "react-hook-form";
import {
  StyledInput,
  Container,
  Label,
  ErrorContainer,
  StyledSelect,
  SelectLabel
} from "./styles";
import isServer from "-/src/utils/isServer";

interface Props {
  type?: string;
  name: string;
  onBlur?: any;
  props?: any;
  prettyName?: string;
  register?: any;
  errors?: any;
  controlled?: boolean;
  optional?: boolean;
  max?: number;
  min?: number;
  control?: any;
  options?: any;
  defaultValue?: { value: any; label: string };
}

export type Ref = HTMLInputElement;

const Select = React.forwardRef<Ref, Props>(
  (
    {
      type = "text",
      name,
      prettyName,
      defaultValue,
      register,
      control,
      options,
      ...props
    },
    ref
  ) => {
    const [firstLetter, ...rest] = name;
    const prettyRest = rest.join("");
    const label = prettyName || firstLetter.toUpperCase() + prettyRest;
    // const fieldValue = watch(name, false);
    const { triggerValidation } = useFormContext();
    return (
      <>
        <Container>
          <SelectLabel>{label}</SelectLabel>
          <Controller
            as={<StyledSelect />}
            menuPortalTarget={!isServer() && document.body}
            classNamePrefix="react-select"
            control={control}
            options={options}
            defaultValue={defaultValue}
            rules={{ required: true }}
            onChange={([selected]) => {
              // React Select return object instead of value for selection
              return { value: selected };
            }}
            name={name}
          />
        </Container>
      </>
    );
  }
);

export default Select;
