import React, { useState } from "react";
import { useList } from "react-use";
import { SizeableContainer } from "-/src/components/shared/form";
import LoginCard from "./subcomponents/LoginCard";
import RegisterCard from "./subcomponents/RegisterCard";
import useResizableForm from "-/src/utils/hooks/useResizableForm";

const Login = () => {
  const [activeSize, formProps] = useResizableForm();
  return (
    <SizeableContainer {...formProps}>
      <LoginCard {...formProps} onResize={formProps.handleSize(0)} />
      <RegisterCard {...formProps} onResize={formProps.handleSize(1)} />
    </SizeableContainer>
  );
};

export default Login;
