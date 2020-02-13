import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${props => props.theme.bg2};
  box-shadow: 0px 5px 0px ${props => props.theme.primary};
  border-radius: 5px;
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

export const NavigatorItem = styled.div`
  font-size: 2rem;
  flex: 1;
  color: ${props => props.theme.txtBg1};
  font-family: Roboto, Arial;
  padding: 1rem 2rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;
  transition: background-color 0.05s ease-in-out;
  will-change: background-color;
  border-radius: 5px;
  margin: 0.5rem;
  user-select: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  &:active {
    opacity: 0.6;
  }
  position: relative;
`;
