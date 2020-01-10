import styled, { css } from "-/src/utils/StyledComponents";
import { ITheme } from "-/src/utils/theme";

const menuSpace: number = 1000;

export const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  border-bottom: 2px solid ${props => props.theme.primary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`;
export const Logo = styled.img.attrs({
  src: "/logo.svg"
})`
  padding-top: 6px;
  width: 20rem;
`;
export const NavItem = styled.a`
  position: relative;
  font-family: Roboto, Arial;
  font-size: 2rem;
  padding: 1.5rem 0;
  margin: 0 1rem;
  color: ${props => props.theme.gray2};
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 5px;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.primary};
    transition: transform 0.2s ease-in-out;
    will-change: transform;
    transform: scaleX(0);
  }
  &:hover {
    &:after {
      transform: scaleX(1);
    }
  }
`;

export const Links = styled.div`
  padding: 0 2rem;
  @media (max-width: 660px) {
    display: none;
  }
`;

export const Collection = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  min-width: ${menuSpace}px;
  padding: 0;
  @media (max-width: ${menuSpace + 20}px) {
    min-width: 100%;
  }
`;

export const Items = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  padding: 0;
  align-items: flex-end;
`;

interface Props {
  type?: "filled" | "stroked";
}

export const Icon = styled.div<Props>`
  padding: 0;
  margin: 0 2rem;
  cursor: pointer;
  ${props =>
    props.type === "filled"
      ? css`
          path {
            fill: ${props.theme.txtBg1};
          }

          transition: fill 0.2s ease-in-out;
          will-change: fill;
          &:hover path {
            fill: ${props.theme.primary};
          }
        `
      : css`
          path {
            stroke: ${props.theme.txtBg1};
          }
          transition: stroke 0.2s ease-in-out;
          will-change: stroke;
          &:hover path {
            stroke: ${props.theme.primary};
          }
        `}
`;
