import styled from "-/src/utils/StyledComponents";

interface ContainerProps {
  isOpen?: boolean;
  navSize: number;
}

export const Container = styled.div<ContainerProps>`
  height: calc(100vh - ${props => props.navSize}px);
  right: 0;
  top: ${props => props.navSize}px;
  min-width: 300px;
  background-color: ${props => props.theme.bg2};
  position: fixed;
  transition: 0.2s ease-in-out;
  transform: ${props => (props.isOpen ? "translateX(0%)" : "translateX(100%)")};
  z-index: 10;
`;
