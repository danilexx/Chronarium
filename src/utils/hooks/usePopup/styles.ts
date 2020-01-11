import styled from "../../StyledComponents";

export const PopupContainer = styled.div`
  background-color: ${props => props.theme.error};
  box-shadow: 0 4px 0 ${props => props.theme.primary};
  border-radius: 5px;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
`;
