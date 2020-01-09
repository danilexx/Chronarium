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
  children: ReactChild;
  isFull?: boolean;
}

export const Column: React.FC<Props> = ({ children, isFull = false }) => (
  <StyledColumn isFull={isFull}>
    <InnerColumn>{children}</InnerColumn>
  </StyledColumn>
);
