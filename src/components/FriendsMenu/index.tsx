import React, { ReactChild } from "react";
import { useToggle } from "react-use";
import {
  PopupHead,
  Title,
  Message,
  PopupBody,
  Buttons
} from "-/src/utils/hooks/usePopup/styles";
import { LoadingButton } from "-/src/components/Button";
import {
  Container,
  MenuItem,
  MenuItemAction,
  OwnUserSection,
  Profile,
  Info,
  Username,
  Status,
  SectionSeparator,
  Uparrow,
  SectionText,
  Friends,
  Friend,
  FriendAvatar,
  FriendInfo,
  FriendUsername,
  FriendStatus,
  AddFriend,
  Plus,
  StyledInput,
  Error
} from "./styles";
import { useStoreState, useStoreActions } from "-/src/utils/EasyPeasy";
import usePopup from "-/src/utils/hooks/usePopup";
import useAwait from "-/src/utils/hooks/useAwait";
import { addFriend } from "-/src/services";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  navSize: number;
  toggle?: (value?: boolean) => void;
}

const friends = [
  {
    username: "figurante",
    status: "bom diaaaaa"
  },
  {
    username: "figurante",
    status: "bom diaaaaa"
  },
  {
    username: "figurante",
    status: "bom diaaaaa"
  }
];

const FriendsMenu: React.FC<Props> = ({
  children,
  isOpen,
  toggle,
  navSize = 0
}) => {
  const [isLoading, fetch, { toggle: toggleLoading }] = useAwait(
    async username => {
      const response = await addFriend({ username });
      return response;
    }
  );
  const [isOnlineFriendsShowed, toggleOnlineFriends] = useToggle(true);
  const [Popup, popupProps] = usePopup();
  React.useEffect(() => {
    popupProps.toggle(true);
  }, []);
  const [username, setUsername] = React.useState("");
  const [error, setError] = React.useState("");
  return (
    <Container navSize={navSize} isOpen={isOpen}>
      <OwnUserSection>
        <Profile src="/images/profile.svg" />
        <Info>
          <Username>danilex</Username>
          <Status>Online</Status>
        </Info>
      </OwnUserSection>
      <SectionSeparator
        onClick={() => {
          toggleOnlineFriends();
        }}
      >
        <Uparrow active={isOnlineFriendsShowed} />
        <SectionText>Online</SectionText>
      </SectionSeparator>
      <Friends>
        <AddFriend
          onClick={() => {
            popupProps.toggle();
          }}
        >
          <Plus />
        </AddFriend>
        {isOnlineFriendsShowed &&
          friends.map(({ username: friendUsername, status }, index) => (
            <Friend key={index}>
              <FriendAvatar src="/images/profile.svg" />
              <FriendInfo>
                <FriendUsername>{friendUsername}</FriendUsername>
                <FriendStatus>{status}</FriendStatus>
              </FriendInfo>
            </Friend>
          ))}
      </Friends>
      <Popup {...popupProps}>
        <PopupHead>
          <Title>Add Friend</Title>
        </PopupHead>
        <PopupBody>
          <Message>
            Username:{" "}
            <StyledInput
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
            />
            {error !== "" && <Error>{error}</Error>}
          </Message>
          <Buttons>
            <LoadingButton
              loading={isLoading}
              onClick={async () => {
                try {
                  const response = await fetch({ username });

                  console.log(response);
                  setUsername("");
                  setError("");
                  popupProps.toggle(false);
                } catch (err) {
                  setError(`User with username "${username}" not found`);
                  toggleLoading(false);
                }
              }}
            >
              Add
            </LoadingButton>
          </Buttons>
        </PopupBody>
      </Popup>
    </Container>
  );
};

export default FriendsMenu;
