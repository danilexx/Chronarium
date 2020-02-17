import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  margin: 2rem 0;
  border-radius: 5px;

  padding: 1rem 4rem;
  @media screen and (max-width: 460px) {
    padding: 1rem 2rem;
  }
`;
