import styled, { css } from "-/src/utils/StyledComponents";

const basePseudoElement = css`
  content: "";
  width: 0;
  height: 0;
  position: absolute;
`;

export const Menu = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: 5px;
  position: relative;
  &:before {
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    bottom: -8px;
    left: 50%;
    margin-left: -10px;
    ${basePseudoElement}
  }
  &:after {
    border-bottom-color: ${props => props.theme.primary};
    border-bottom-style: solid;
    border-bottom-width: 6px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    top: -6px;
    left: 50%;
    margin-left: -8px;
    ${basePseudoElement}
  }
`;

export const MenuItem = styled.div<{ delete?: boolean }>`
  background-color: rgba(255, 255, 255, 0);
  font-family: Roboto, Arial;
  color: ${props => props.theme.txtBg1};
  font-size: 2rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease-in-out;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem 0;

  &:hover {
    background-color: ${props =>
      props.delete ? props.theme.error : props.theme.primary};
  }
  @media screen and (max-width: 400px) {
    padding: 1rem 2rem;
  }
`;
