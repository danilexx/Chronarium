import ReactTooltip from "react-tooltip";
import styled from "-/src/utils/StyledComponents";

const Tooltip = styled(ReactTooltip)`
  background-color: ${props => props.theme.bg2} !important;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: none;
  /* border: 1px solid ${props => props.theme.primary}; */
  &:after,
  &:before {
    border-top-color: ${props => props.theme.primary} !important;
    bottom: -8px !important;
  }
  &.__react_component_tooltip.show{
  opacity: 1;
  }
  margin-bottom: 2px;
  box-shadow: 0 2px 0 ${props => props.theme.primary};
`;
export default Tooltip;
