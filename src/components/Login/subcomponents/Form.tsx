import React, { createContext } from "react";
import { StyledForm } from "../styles";

interface Props {
  register: any;
  errors: any;
  watch?: any;
}
type FormProps = Props & React.ButtonHTMLAttributes<any>;
export const FormContext = createContext<Props>({
  register: () => {},
  errors: {},
  watch: () => ""
});
const Form: React.FC<FormProps> = ({
  children,
  register,
  errors,
  watch,
  ...props
}) => {
  return (
    <StyledForm {...props}>
      <FormContext.Provider value={{ register, errors, watch }}>
        {children}
      </FormContext.Provider>
    </StyledForm>
  );
};

export default Form;
