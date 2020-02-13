import styled from "-/src/utils/StyledComponents";

export const Name = styled.p`
  font-size: 2rem;
  color: ${props => props.theme.txtBg1};
  font-family: Robot, Arial;
  margin: 0.5rem auto;
  width: 100%;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.txtBg1};
  font-family: Robot, Arial;
  margin: 0.5rem auto;
  width: 100%;
  max-width: 80vw;
  text-align: center;
`;
