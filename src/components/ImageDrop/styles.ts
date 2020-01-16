import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.bg1};
  border-radius: 5px;
  margin: 1rem 0;
  display: flex;
  border: 0.5rem solid ${props => props.theme.primary};
`;

export const ImageDisplay = styled.img`
  width: 50%;
  margin: 1rem auto;
`;
