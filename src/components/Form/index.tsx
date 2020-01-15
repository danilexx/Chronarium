import React, { createContext } from "react";
import { useForm, FormContext } from "react-hook-form";
import { InnerForm } from "-/src/components/shared/form";

interface Props {
  defaultValues?: any;
  onSubmit?: any;
  children: any | any[];
  validationSchema?: any;
}
type FormProps = Props & React.ButtonHTMLAttributes<any>;
const Form: React.FC<FormProps> = ({
  defaultValues,
  children,
  onSubmit,
  validationSchema,
  ...props
}) => {
  const methods = useForm({ defaultValues, validationSchema });
  const { handleSubmit } = methods;
  return (
    <InnerForm onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormContext {...methods}>
        {Array.isArray(children)
          ? children.map((child: any) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register: methods.register,
                      errors: methods.errors,
                      key: child.props.name
                    }
                  })
                : child;
            })
          : children}
      </FormContext>
    </InnerForm>
  );
};

export default Form;
