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
  z-index: 15;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-shadow: -4px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const OwnUserSection = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
`;

export const Profile = styled.img`
  border-radius: 50%;
  height: 10rem;
  width: 10rem;
  border: 0.2rem solid ${props => props.theme.primary};
`;

export const Username = styled.h3`
  font-family: Roboto, Arial;
  color: ${props => props.theme.txtBg1};
  font-size: 2.5rem;
  margin: 0;
  margin-bottom: 0.2rem;
  height: fit-content;
`;
export const Status = styled.p`
  font-family: Roboto, Arial;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.txtBg1};
  height: fit-content;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;
export const SectionSeparator = styled.div`
  width: 100%;
  background-color: ${props => props.theme.primary};
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:active {
    opacity: 0.6;
  }
`;

export const Uparrow = styled.img.attrs({ src: "/icons/uparrow.svg" })<{
  active;
}>`
  height: 1rem;
  user-select: none;
  transform: ${props => props.active && "rotate(180deg)"};
`;

export const SectionText = styled.p`
  text-align: left;
  font-family: Roboto, Arial;
  font-size: 1.5rem;
  color: ${props => props.theme.txtPrimary};
  padding: 0;
  margin: 0;
  margin-left: 1rem;
  user-select: none;
`;

export const Friends = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Friend = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  padding: 1rem 2rem;
  position: relative;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  &:after {
    position: absolute;
    bottom: -0.1rem;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    width: 90%;
    height: 0.2rem;
    background-color: ${props => props.theme.gray1};
    opacity: 0.2;
    border-radius: 2px;
  }
`;

export const FriendAvatar = styled.img`
  height: 5rem;
  width: 5rem;
`;

export const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 1rem;
`;

export const FriendUsername = styled.h3`
  color: ${props => props.theme.txtBg1};
  font-family: Roboto, Arial;
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 0.2rem;
`;

export const FriendStatus = styled.p`
  color: ${props => props.theme.gray1};
  font-family: Roboto, Arial;
  font-size: 1rem;
  margin: 0;
`;

export const AddFriend = styled(Friend)`
  justify-content: center;
  align-items: center;
`;

export const Plus = styled.img.attrs({ src: "/icons/plus.svg" })`
  height: 5rem;
  width: 5rem;
  background-color: ${props => props.theme.primary};
  border-radius: 50%;
  user-select: none;
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
