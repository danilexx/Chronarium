import React, { createContext } from "react";
import styled from "-/src/utils/StyledComponents";

export const Container = styled.div<{ size: number }>`
  background-color: ${props => props.theme.bg2};
  width: fit-content;
  transition: height 0.5s ease-in-out 0.2s;
  will-change: height;
  height: ${props => props.size}px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  box-shadow: 0 4px 0 ${props => props.theme.primary};
  margin-bottom: 4px;
  padding: 1rem 3rem;
  @media screen and (max-width: 700px) {
    margin: 0 auto;
  }
  position: relative;
  --form-width: 30rem;
  width: var(--form-width);
  overflow: hidden;
  @media screen and (max-width: 500px) {
    --form-width: calc(100vw - 15rem);
    padding: 3rem 4rem;
  }
  box-sizing: content-box;
`;

export const StyledForm = styled.form`
  flex: 1;
`;

export const Header = styled.h1`
  font-family: "Trade Winds";
  color: ${props => props.theme.primary};
  font-size: 4rem;
  width: 100%;
  text-align: center;
  letter-spacing: 0.22rem;
  margin: 0.5rem 0;
`;

export const LoginForm = styled.div<{ index: number }>`
  min-width: var(--form-width);
  height: fit-content;
  padding: 0;
  transition: transform 0.2s ease-in-out;
  will-change: transform;
  transform: ${props =>
    `translateX(calc(-${props.index * 100}% - ${
      props.index === 0 ? "0rem" : "10rem"
    }))`};
  margin-right: 10rem;
`;

export const RegisterForm = styled(LoginForm)``;
