import styled from "../../StyledComponents";

import customScrollBar from "-/src/utils/customScrollBar";

const getColor = (props: any) =>
  props.error ? props.theme.error : props.theme.primary;

export const PopupContainer = styled.div<{ error?: boolean }>`
  --color: ${getColor}
  background-color: ${props => props.theme.bg2};
  color: ${props => props.theme.txtBg1};
  font-size: 2rem;
  font-family: "Roboto", "Arial";
  box-shadow: 0 4px 0 var(--color), -4px 5px 5px 2px rgba(0,0,0, 0.3);
  border-radius: 5px;
  position: fixed;
  padding: 0;
  width: fit-content;
  max-width: 50vw;
  @media screen and (max-width: 600px) {
    max-width: 90vw;
  }
  z-index: 55;
`;

export const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 61;
`;

export const PopupHead = styled.div`
  background-color: var(--color);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0.5rem 0.8rem;
  display: flex;
`;
export const Title = styled.h4`
  font-size: 3rem;
  margin: 0 2rem;
  text-align: center;
  flex: 1;
  color: ${props => props.theme.txtPrimary};
`;
export const Message = styled.p`
  font-size: 2.2rem;
  width: 100%;
  text-align: center;
  margin: 0;
  white-space: pre-line;
`;

export const PopupBody = styled.div`
  padding: 1rem 2rem;
  max-height: 80vh;
  overflow: auto;
  z-index: 0;
  ${customScrollBar}
`;

export const Buttons = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  border-radius: 5px;
  font-size: 2rem;
  border: none;
  padding: 1rem;
  color: ${props => props.theme.bg2};
`;

export const Error = styled.b`
  color: ${props => props.theme.error};
  font-size: 1.5rem;
`;

export const TitleMessage = styled.p`
  font-size: 2rem;
  margin: 0 auto;
  margin-bottom: 1rem;
`;
