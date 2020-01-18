import styled from "-/src/utils/StyledComponents";

export const StateRow = styled.div<{ column: boolean }>`
  display: flex;
  flex-direction: ${props => (props.column ? "column" : "row")};
  align-items: center;
  justify-content: ${props => (props.column ? "center" : "flex-start")};
  text-align: ${props => (props.column ? "center" : "left")};
  margin: 0.5rem 0;
`;
export const Key = styled.p`
  font-family: Roboto, Arial;
  font-size: 2rem;
  color: ${props => props.theme.gray2};
  margin: 0.5rem 0;
`;
export const Value = styled.p`
  font-family: Roboto, Arial;
  font-size: 1.8rem;
  color: ${props => props.theme.gray1};
  margin: 0 0.5rem;
`;
