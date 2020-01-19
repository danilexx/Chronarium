import { ReactChild } from "react";
import styled, { css } from "-/src/utils/StyledComponents";

export const StyledColumn = styled.div<{ isFull?: boolean; center?: boolean }>`
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: ${props => (props.center ? "center" : "flex-start")};
  width: 100%;
  ${props =>
    props.isFull &&
    css`
      flex: 1;
    `};
`;

export const InnerColumn = styled.div<{ center: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.center ? "center" : "flex-start")};
  justify-content: ${props => (props.center ? "center" : "flex-start")};
  margin: 0 auto;
  width: 1000px;
  padding: 2rem;
  @media (max-width: 1020px) {
    width: 100%;
  }
`;

interface Props {
  children?: React.ReactNode;
  isFull?: boolean;
  center?: boolean;
  className?: string;
}

export const Column: React.FC<Props & React.BaseHTMLAttributes<any>> = ({
  children,
  center = false,
  isFull = false,
  className,
  ...props
}) => (
  <StyledColumn
    className={className}
    isFull={isFull}
    center={center}
    {...props}
  >
    <InnerColumn center={center}>{children}</InnerColumn>
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

export const NewAdventureBackground = styled(Background)`
  background: linear-gradient(90deg, #2a2a2a 20%, rgba(0, 0, 0, 0) 100%),
    url("/images/newAdventure.png");
  justify-content: center;
`;

export const RowLayout = styled(Column)`
  flex-direction: row;
  flex-wrap: wrap;
  & > div {
    flex-direction: row;
    flex-wrap: wrap;
  }
  /* div { */
  /* flex-direction: row !important; */
  /* } */
`;
