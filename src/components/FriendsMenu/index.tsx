import React, { ReactChild } from "react";
import { useToggle, useList } from "react-use";
import isServer from "-/src/utils/isServer";
import { LoadingButton } from "-/src/components/Button";
import { PendingFriends, Friends } from "./internals";
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
  FriendList,
  Friend,
  FriendAvatar,
  FriendInfo,
  FriendUsername,
  FriendStatus
} from "./styles";
import { useStoreState, useStoreActions } from "-/src/utils/EasyPeasy";
import usePopup from "-/src/utils/hooks/usePopup";
import useAwait from "-/src/utils/hooks/useAwait";
import {
  getPendingFriends,
  acceptFriendshipRequest,
  denyFriendshipRequest,
  getFriends,
  removeFriend,
  getMyAdventures,
  getPendingAdventures
} from "-/src/services";
import PendingAdventures from "./PendingAdventures";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  navSize: number;
  toggle?: (value?: boolean) => void;
}

interface FriendsContextProps {
  isPendingFriendsShowed: any;
  togglePendingFriends: any;
  pendingFriends: any;
  acceptFriendshipRequest: any;
  removePendingFriendAt: any;
  denyFriendshipRequest: any;
  isOnlineFriendsShowed: any;
  popupProps: any;
  deleteFriend: any;
  updateAt: any;
  setFriends: any;
  pushFriends: any;
  toggleOnlineFriends: any;
  friends: any;
  myAdventures: any[];
  isAdventuresShowed: any;
  togglePendingAdventures: any;
  pendingAdventures: any[];
  setPendingAdventures: any;
  isPendingAdventuresShowed: any;
  removePendingAdventureAt: any;
}

export const FriendsContext = React.createContext<Partial<FriendsContextProps>>(
  {}
);

const FriendsMenu: React.FC<Props> = ({
  children,
  isOpen,
  toggle,
  navSize = 0
}) => {
  const [isOnlineFriendsShowed, toggleOnlineFriends] = useToggle(true);
  const [isPendingFriendsShowed, togglePendingFriends] = useToggle(true);
  const [isPendingAdventuresShowed, togglePendingAdventures] = useToggle(true);
  const [
    pendingFriends,
    {
      set: setPendingFriends,
      removeAt: removePendingFriendAt,
      push: pushPendingFriends
    }
  ] = useList<any>([]);
  const [
    friends,
    { updateAt, set: setFriends, push: pushFriends, removeAt: removeFriendAt }
  ] = useList<any>([]);
  const [myAdventures, { set: setMyAdventures }] = useList<any>([]);
  const [
    pendingAdventures,
    {
      set: setPendingAdventures,
      push: pushPendingAdventures,
      removeAt: removePendingAdventureAt
    }
  ] = useList<any>([]);
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
        const response: any = await getMyAdventures();
        setMyAdventures(response.data);
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
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response: any = await getPendingAdventures();
        setPendingAdventures(response.data);
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
      });
      const pendingAdventure = ws.subscribe(`pendingAdventures:${user.id}`);
      pendingAdventure.on("new:request", (data: any) => {
        console.log("chegou");
        pushPendingAdventures(data);
      });
      const friendships = ws.subscribe(`friendship:${user.id}`);
      friendships.on("new:friend", (data: any) => {
        pushFriends(data);
      });
      friendships.on("delete:friend", (data: any) => {
        removeFriendAt(friends.findIndex(e => e.id === data.id));
      });
    });
  }, []);

  const deleteFriend = React.useCallback(
    async (id, index) => {
      const response = await removeFriend(id)();
      removeFriendAt(index);
    },
    [removeFriendAt]
  );

  // React.useEffect(() => {
  //   console.log(friends);
  // }, [friends]);

  return (
    <FriendsContext.Provider
      value={{
        isPendingFriendsShowed,
        togglePendingFriends,
        pendingFriends,
        acceptFriendshipRequest,
        removePendingFriendAt,
        denyFriendshipRequest,
        isOnlineFriendsShowed,
        popupProps,
        deleteFriend,
        updateAt,
        setFriends,
        pushFriends,
        friends,
        toggleOnlineFriends,
        myAdventures,
        pendingAdventures,
        setPendingAdventures,
        togglePendingAdventures,
        isPendingAdventuresShowed,
        removePendingAdventureAt
      }}
    >
      <Container navSize={navSize} isOpen={isOpen}>
        <OwnUserSection>
          <Profile src="/images/profile.svg" />
          <Info>
            <Username>{user.username}</Username>
            <Status>Online</Status>
          </Info>
        </OwnUserSection>
        <Body>
          <PendingAdventures />
          <PendingFriends />
          <Friends />
        </Body>
        <Popup {...popupProps} />
      </Container>
    </FriendsContext.Provider>
  );
};

export default FriendsMenu;
