import { createGlobalStyle } from "./StyledComponents";

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100vh;
  }
  * {
    box-sizing: border-box;
  }
  #__next{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  html{
    font-size: 62.5%;
    background-color: ${props => props.theme.bg1};
  }

  div{
    /* padding: 2rem; */
    &#__next{
      padding: 0;
    }
  }

  @media (max-width: 1080) {
    html {
      font-size: 58%;
    }
  }

  @media (max-width: 600px) {
    html{
      font-size: 50%;
    }
  }

  p {
    font-size: 1.4rem;
  }

  span {
    font-size: 2rem;
  }

`;
