import styled from "-/src/utils/StyledComponents";

export const Header = styled.h1`
  color: ${props => props.theme.primary};
  font-size: 4rem;
  letter-spacing: 0.4rem;
  font-family: "Trade Winds", Arial;
  margin: 0.5rem 0;
  padding: 0 3rem;
  @media screen and (max-width: 600px) {
    width: 100%;
    text-align: center;
  }
`;
