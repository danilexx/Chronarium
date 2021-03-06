import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  margin: 2rem auto;
  border-radius: 5px;
  width: 40rem;
  padding: 2rem 4rem;
  @media screen and (max-width: 400px) {
    padding: 1rem 2rem;
    width: 100%;
  }
`;
