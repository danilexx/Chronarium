import { ReactChild } from "react";
import styled, { css } from "-/src/utils/StyledComponents";

export const StyledColumn = styled.div<{ isFull?: boolean }>`
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  ${props =>
    props.isFull &&
    css`
      flex: 1;
    `};
`;

export const InnerColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  width: 1000px;
  @media (max-width: 1020px) {
    width: 100%;
  }
`;

interface Props {
  children: React.ReactNode;
  isFull?: boolean;
}

export const Column: React.FC<Props> = ({ children, isFull = false }) => (
  <StyledColumn isFull={isFull}>
    <InnerColumn>{children}</InnerColumn>
  </StyledColumn>
);

export const Row = styled.div`
  /* width: 100%; */
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 0;
`;

export const Background = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  background: linear-gradient(90deg, #2a2a2a 20%, rgba(0, 0, 0, 0) 100%),
    url("/images/login-bg.png");
  background-repeat: no-repeat;
  background-position: right;
  padding: 0;
  @media screen and (max-width: 700px) {
    background: url("/images/login-bg.png");
  }
`;
