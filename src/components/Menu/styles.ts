import styled, { css } from "-/src/utils/StyledComponents";
import Link from "../Link";

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
  display: flex;
  flex-direction: column;
  padding: 0;
  box-shadow: -4px 0px 10px rgba(0, 0, 0, 0.5);
`;
const styles = css`
  position: relative;
  font-family: Roboto, Arial;
  font-size: 2rem;
  padding: 1.5rem 0;
  width: 100%;
  margin: 0;
  text-align: center;
  color: ${props => props.theme.gray2};
  cursor: pointer;
  text-decoration: none;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.primary};
    transition: transform 0.2s ease-in-out;
    will-change: transform;
    transform: translateX(-50%) scaleX(1);
  }
  &:active {
    opacity: 0.7;
  }
  color: ${props => props.theme.txtBg1};
`;
export const MenuItem = styled(Link)<{ href?: string; onClick?: any }>`
  ${styles}
`;

export const MenuItemAction = styled.p<{ onClick?: any }>`
  ${styles}
`;
