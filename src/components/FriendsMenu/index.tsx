import React, { ReactChild } from "react";
import { useToggle, useList } from "react-use";
import isServer from "-/src/utils/isServer";
import { LoadingButton } from "-/src/components/Button";
import {
  Container,
  OwnUserSection,
  Profile,
  Info,
  Username,
  Body,
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
  PendingFriend,
  Actions,
  Accept,
  Decline,
  FriendMenu,
  FriendMenuItem
} from "./styles";
import { useStoreState, useStoreActions } from "-/src/utils/EasyPeasy";
import usePopup from "-/src/utils/hooks/usePopup";
import useAwait from "-/src/utils/hooks/useAwait";
import {
  addFriend,
  getPendingFriends,
  acceptFriendshipRequest,
  getFriends
} from "-/src/services";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  navSize: number;
  toggle?: (value?: boolean) => void;
}

const FriendsMenu: React.FC<Props> = ({
  children,
  isOpen,
  toggle,
  navSize = 0
}) => {
  const [isOnlineFriendsShowed, toggleOnlineFriends] = useToggle(true);
  const [isPendingFriendsShowed, togglePendingFriends] = useToggle(true);
  const [
    pendingFriends,
    {
      set: setPendingFriends,
      removeAt: removePendingFriendAt,
      push: pushPendingFriends
    }
  ] = useList<any>([]);
  const [friends, { updateAt, set: setFriends, push: pushFriends }] = useList<
    any
  >([]);
  const [Popup, popupProps] = usePopup("addFriend");
  // React.useEffect(() => {
  //   popupProps.toggle(true);
  // }, []);
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response: any = await getPendingFriends();
        setPendingFriends(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fn();
  }, []);
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response: any = await getFriends();
        setFriends(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fn();
  }, []);
  const user = useStoreState(state => state.user);
  React.useEffect(() => {
    if (isServer()) return;
    // eslint-disable-next-line global-require
    const Ws = require("@adonisjs/websocket-client");
    const ws = Ws(process.env.WEB_SOCKET_URL);
    ws.connect();
    ws.on("open", () => {
      const pendingF = ws.subscribe(`pendingFriends:${user.id}`);
      pendingF.on("new:request", (data: any) => {
        pushPendingFriends(data);
        // setMessages(state => [...state, data]);
      });
      const friendships = ws.subscribe(`friendship:${user.id}`);
      friendships.on("new:friend", (data: any) => {
        pushFriends(data);
        // setMessages(state => [...state, data]);
      });
    });
  }, []);

  return (
    <Container navSize={navSize} isOpen={isOpen}>
      <OwnUserSection>
        <Profile src="/images/profile.svg" />
        <Info>
          <Username>{user.username}</Username>
          <Status>Online</Status>
        </Info>
      </OwnUserSection>
      <Body>
        <SectionSeparator
          first
          onClick={() => {
            togglePendingFriends();
          }}
        >
          <Uparrow active={isPendingFriendsShowed} />
          <SectionText>Pending</SectionText>
        </SectionSeparator>
        {isPendingFriendsShowed && (
          <Friends>
            {pendingFriends.map(({ sender, id }, index) => (
              <PendingFriend>
                <FriendAvatar src="/images/profile.svg" />
                <FriendInfo>
                  <FriendUsername>{sender.username}</FriendUsername>
                  <FriendStatus>online</FriendStatus>
                </FriendInfo>
                <Actions>
                  <Accept
                    onClick={async () => {
                      try {
                        removePendingFriendAt(index);
                        const response = await acceptFriendshipRequest({
                          to_add_user_id: sender.id,
                          pending_friendship_id: id
                        });
                        console.log(response);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                  <Decline />
                </Actions>
              </PendingFriend>
            ))}
          </Friends>
        )}
        <SectionSeparator
          onClick={() => {
            toggleOnlineFriends();
          }}
        >
          <Uparrow active={isOnlineFriendsShowed} />
          <SectionText>Online</SectionText>
        </SectionSeparator>
        {isOnlineFriendsShowed && (
          <Friends>
            <AddFriend
              onClick={() => {
                popupProps.toggle();
              }}
            >
              <Plus />
            </AddFriend>
            {friends.map((currentFriend, index) => {
              const {
                username: friendUsername,
                status = "default_status",
                isMenuOpen
              } = currentFriend;
              return (
                <>
                  <Friend
                    key={index}
                    onClick={() => {
                      setFriends(state =>
                        state.map(e => ({ ...e, isMenuOpen: false }))
                      );
                      updateAt(index, {
                        ...currentFriend,
                        isMenuOpen: !currentFriend.isMenuOpen
                      });
                    }}
                  >
                    <FriendAvatar src="/images/profile.svg" />
                    <FriendInfo>
                      <FriendUsername>{friendUsername}</FriendUsername>
                      <FriendStatus>{status}</FriendStatus>
                    </FriendInfo>
                    <Uparrow active={isMenuOpen} />
                  </Friend>
                  {isMenuOpen && (
                    <FriendMenu>
                      <FriendMenuItem>Invite</FriendMenuItem>
                      <FriendMenuItem>Chat</FriendMenuItem>
                      <FriendMenuItem>Delete</FriendMenuItem>
                    </FriendMenu>
                  )}
                </>
              );
            })}
          </Friends>
        )}
      </Body>
      <Popup {...popupProps} />
    </Container>
  );
};

export default FriendsMenu;
