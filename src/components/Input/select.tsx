import React from "react";

import { ErrorMessage, useFormContext, Controller } from "react-hook-form";
import { lighten } from "polished";
import {
  StyledInput,
  Container,
  Label,
  ErrorContainer,
  StyledSelect,
  SelectLabel
} from "./styles";
import { ThemeContext } from "-/src/utils/StyledComponents";
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
  portalMenu?: boolean;
  defaultValue?: { value: any; label: string };
}
const portalStyles = {
  menuPortal: provided => ({
    ...provided,
    zIndex: 90
  })
};
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
      portalMenu = true,
      ...props
    },
    ref
  ) => {
    const [firstLetter, ...rest] = name;
    const prettyRest = rest.join("");
    const label = prettyName || firstLetter.toUpperCase() + prettyRest;
    // const fieldValue = watch(name, false);
    const theme = React.useContext(ThemeContext);
    const { triggerValidation } = useFormContext();
    return (
      <>
        <Container>
          <SelectLabel>{label}</SelectLabel>
          <Controller
            as={<StyledSelect />}
            {...(!isServer() && portalMenu === true
              ? { menuPortalTarget: document.body }
              : {})}
            // menuPortalTarget={!isServer() && document.body}
            classNamePrefix="react-select"
            control={control}
            options={options}
            styles={portalStyles}
            isSearchable={false}
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
