import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.5rem;
`;
export const Part = styled.p`
  color: ${props => props.theme.gray2};
  font-size: 1.9rem;
  margin: 0 1rem;
  padding: 0.5rem 0;
  font-family: Roboto, Arial;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.txtBg2};
  }
`;

export const Arrow = styled(Part)`
  margin: 0;
`;
