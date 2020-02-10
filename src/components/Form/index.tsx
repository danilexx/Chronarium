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
export const BaseForm: React.FC<FormProps> = ({
  defaultValues,
  children,
  onSubmit,
  methods,
  validationSchema,
  ...props
}) => {
  const { handleSubmit }: { handleSubmit: any } = methods;
  return (
    // @ts-ignore
    <InnerForm onSubmit={handleSubmit(onSubmit) as any} {...props}>
      <FormContext {...methods}>
        {Array.isArray(children)
          ? children.map((child: any) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register: methods.register,
                      errors: methods.errors,
                      control: methods.control,
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
const Form: React.FC<FormProps> = ({
  defaultValues,
  children,
  onSubmit,
  validationSchema,
  ...props
}) => {
  const methods = useForm<any>({ defaultValues, validationSchema });
  const { handleSubmit }: { handleSubmit: any } = methods;
  return (
    // @ts-ignore
    <InnerForm onSubmit={handleSubmit(onSubmit) as any} {...props}>
      <FormContext {...methods}>
        {Array.isArray(children)
          ? children.map((child: any) => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      register: methods.register,
                      errors: methods.errors,
                      control: methods.control,
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
