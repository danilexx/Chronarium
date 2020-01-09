import styled, { css } from "-/src/utils/StyledComponents";

interface Props {
  instance: "primary" | "secondary";
  isFull: boolean;
}

export const Container = styled.button<Props>`
  border: none;
  padding: 1rem 4rem;
  font-size: 2rem;
  margin: 0.5rem 0rem;
  font-family: Roboto, Arial;
  cursor: pointer;
  ${props =>
    props.isFull &&
    css`
      flex: 1;
      width: 100%;
    `}
  ${props =>
    props.instance === "primary"
      ? css`
          background-color: ${props.theme.primary};
          color: ${props.theme.txtPrimary};
          border-radius: 5px;
          box-shadow: 0 4px ${props.theme.bg1};
        `
      : css`
          border: 1px solid ${props.theme.primary};
          background-color: ${props.theme.bg2};
          color: ${props.theme.txtBg2};
          border-radius: 5px;
          box-shadow: 0 4px ${props.theme.primary};
        `}
  transition: transform 0.2s ease-in-out;
  will-change: transform;
  &:hover {
    transform: translateY(-0.4rem);
  }
  &:active {
    transition: none;
    opacity: 0.5;
  }
`;

export const Buttons = styled.div`
  margin: 1.5rem 0;
  padding: 0;
`;
