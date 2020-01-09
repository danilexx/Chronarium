import styled from "-/src/utils/StyledComponents";

export const StyledInput = styled.input`
  width: 35rem;
  font-size: 2.2rem;
  border-radius: 2px;
  padding: 0.5rem 0.8rem;
  border: 1px solid ${props => props.theme.gray1};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-bottom: 0.8rem;
`;

export const Label = styled.label`
  font-family: Roboto, Arial;
  font-size: 2.5rem;
  color: ${props => props.theme.primary};
  text-indent: 0.8rem;
  margin-bottom: 0.7rem;
`;
