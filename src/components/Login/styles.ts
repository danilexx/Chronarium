import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  width: fit-content;
  border-radius: 5px;
  box-shadow: 0 4px 0 ${props => props.theme.primary};
  margin-bottom: 4px;
  padding: 1rem 3rem;
  @media screen and (max-width: 700px) {
    margin: 0 auto;
  }
`;

export const Form = styled.form`
  flex: 1;
`;

export const Header = styled.h1`
  font-family: "Trade Winds";
  color: ${props => props.theme.primary};
  font-size: 4rem;
  width: 100%;
  text-align: center;
  letter-spacing: 0.22rem;
  margin: 0.5rem 0;
`;
