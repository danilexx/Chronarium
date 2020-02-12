import ReactTooltip from "react-tooltip";
import styled, { css } from "-/src/utils/StyledComponents";

export const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  margin: 2rem 0;
  border-radius: 5px;

  padding: 1rem 4rem;
  @media screen and (max-width: 460px) {
    padding: 1rem 2rem;
  }
`;
export const Row = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  margin: 1.5rem 0;
  border-radius: 5px;
  box-shadow: -5px 0px 0px ${props => props.theme.primary};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  border: 2px solid rgba(0, 0, 0, 0);
  transition: border-color 0.1s ease-in-out;
  border-left: none;
  cursor: pointer;
  &:hover {
    border-color: ${props => props.theme.primary};
  }
`;
export const PlusButton = styled.img.attrs({
  src: "/icons/plus.svg"
})`
  margin: 0 1rem;
  border-radius: 10px;
  background-color: ${props => props.theme.primary};
  /* padding: 0.5rem; */
  width: 6rem;
  height: 6rem;
  margin: auto;
  border-radius: 50%;
`;

export const Tooltip = styled(ReactTooltip)`
  background-color: ${props => props.theme.bg2} !important;
  /* border: 1px solid ${props => props.theme.primary}; */
  &:after,
  &:before {
    border-top-color: ${props => props.theme.primary} !important;
  }
  &.__react_component_tooltip.show{
  opacity: 1;

  }
  box-shadow: 0 2px 0 ${props => props.theme.primary};
`;

const basePseudoElement = css`
  content: "";
  width: 0;
  height: 0;
  position: absolute;
`;

export const SkillMenu = styled.div`
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

export const SkillMenuItem = styled.div<{ delete?: boolean }>`
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
