import styled from "-/src/utils/StyledComponents";

export const Message = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.txtBg1};
  font-family: Robot, Arial;
  margin: 0.5rem auto;
  width: 100%;
  text-align: center;
`;

export const Attribute = styled.p<{ attribute: string }>`
  font-size: 2.2rem;
  font-weight: bold;
  display: inline;
  color: ${props => props.theme.attributes[props.attribute]};
  font-family: Robot, Arial;
  margin: 0.5rem auto;
  width: 100%;
  max-width: 80vw;
  text-align: center;
`;
