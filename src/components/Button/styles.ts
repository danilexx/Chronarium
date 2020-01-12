import styled, { css, keyframes } from "-/src/utils/StyledComponents";

interface Props {
  instance: "primary" | "secondary" | "error";
  isFull: boolean;
}

const getButtonInstance = (props: any) => {
  switch (props.instance) {
    case "secondary": {
      return css`
        border: 1px solid ${props.theme.primary};
        background-color: ${props.theme.bg2};
        color: ${props.theme.txtBg2};
        border-radius: 5px;
        box-shadow: 0 4px ${props.theme.primary};
      `;
    }
    case "error": {
      return css`
        background-color: ${props.theme.error};
        color: ${props.theme.txtError};
        border-radius: 5px;
        box-shadow: 0 4px ${props.theme.bg1};
      `;
    }
    default: {
      return css`
        background-color: ${props.theme.primary};
        color: ${props.theme.txtPrimary};
        border-radius: 5px;
        box-shadow: 0 4px ${props.theme.bg1};
      `;
    }
  }
};

export const Container = styled.button<Props>`
  overflow: hidden;
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
  ${props => getButtonInstance(props)}
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

const loading = keyframes`
  0%{
    transform: translateX(-100%);
    opacity: 1;
  }
  90%{
    transform: translateX(0%);
    opacity: 0.5;
  }
  100%{
    transform: translateX(0%);
    opacity: 0;
  }
`;

export const ButtonLoadingBar = styled.div<{ isGoing: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  /* transition: transform 2s ease-in-out; */
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-100%);
  animation: ${props =>
    props.isGoing &&
    css`
      ${loading} 4s ease-in-out
    `};
`;
