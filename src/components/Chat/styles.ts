import Textarea from "react-autosize-textarea";
import styled, { css } from "-/src/utils/StyledComponents";
import Input from "-/src/components/Input";
import { BaseForm } from "-/src/components/Form";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

export const Title = styled.div`
  font-family: Trade Winds, Arial;
  font-size: 4rem;
  color: ${props => props.theme.primary};
`;

export const Window = styled.div`
  background-color: ${props => props.theme.bg2};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 25rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* width */
  ::-webkit-scrollbar {
    width: 1rem;

    border-radius: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(151, 70, 255, 0.5);
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(151, 70, 255, 0.7);
  }
`;

const messageStyles = css`
  font-family: Roboto, Arial;
  background-color: white;
  color: ${props => props.theme.bg2};
  width: fit-content;
  text-align: left;
  padding: 1rem;
  font-size: 1.25rem;
  border-radius: 5px;
  max-width: 80%;
  height: fit-content;
  position: relative;
  margin-bottom: 12px;
  word-break: break-word;
`;

export const MyMessage = styled.p<{ chatPin: boolean }>`
  ${messageStyles}
  margin: 0.2rem;
  align-self: flex-end;
  ${props =>
    props.chatPin &&
    css`
      margin-bottom: 0.5rem;
      border-bottom-right-radius: 0;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translateY(100%);
        background-image: url("/icons/chat-pin.svg");
        width: 6px;
        height: 12px;
      }
    `}
`;

export const OtherPeopleMessage = styled.div<{ chatPin: boolean }>`
  ${messageStyles}
  margin-bottom: 0.5rem;
  ${props =>
    props.chatPin &&
    css`
      border-bottom-left-radius: 0;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(100%) scaleX(-1);
        background-image: url("/icons/chat-pin.svg");
        width: 6px;
        height: 12px;
      }
    `}
`;

export const MessageOwner = styled.p`
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

export const UserInput = styled.div`
  background-color: ${props => props.theme.bg2};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 5px 0px ${props => props.theme.primary};
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

// export const Input = styled(Textarea)`
//   flex: 1;
//   font-size: 2rem;
//   padding: 1.25rem 1rem;
//   border-radius: 5px;
//   font-family: Roboto, Arial;
//   border: none;
//   color: ${props => props.theme.bg2};
//   resize: none;
// `;

export const ButtonWrapper = styled.button`
  border: none;
  background-color: ${props => props.theme.primary};
  border-radius: 5px;
  margin-left: 1rem;
  height: 5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Send = styled.img.attrs({ src: "/icons/send.svg" })`
  padding: 1rem 4rem;
  height: 5rem;
`;

export const ChatForm = styled(BaseForm)`
  display: flex;
`;
export const ChatInput = styled(Input).attrs({
  isFull: true
})`
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  flex: 1;
`;
