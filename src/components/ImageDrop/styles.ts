import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.bg1};
  border-radius: 5px;
  margin: 1rem auto;
  display: flex;
  border: 0.5rem solid ${props => props.theme.primary};
  max-width: 30rem;
`;

export const ImageDisplay = styled.img`
  width: 50%;
  margin: 1rem auto;
  max-width: 30rem;
`;
