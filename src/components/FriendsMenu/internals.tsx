import isFalsy from "-/src/utils/isFalsy";
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
  FriendStatus,
  AddFriendContainer,
  Plus,
  PendingFriend,
  Actions,
  Accept,
  Decline,
  FriendMenuContainer,
  FriendMenuItem,
  FriendSubMenu,
  FriendSubMenuItem,
  FriendSubSubMenu,
  FriendSubSubMenuItem,
  FriendSubSubMenuItemLoadingBar
} from "./styles";
import { FriendsContext } from "./index";
import { invitePlayer } from "-/src/services";

const PendingFriendsSeparator = () => {
  const { togglePendingFriends, isPendingFriendsShowed } = React.useContext(
    FriendsContext
  );
  return (
    <SectionSeparator
      first
      onClick={() => {
        togglePendingFriends();
      }}
    >
      <Uparrow active={isPendingFriendsShowed} />
      <SectionText>Pending</SectionText>
    </SectionSeparator>
  );
};
const PendingFriendActions = ({ index, sender, id }) => {
  const {
    removePendingFriendAt,
    acceptFriendshipRequest,
    denyFriendshipRequest
  } = React.useContext(FriendsContext);
  return (
    <Actions>
      <Accept
        onClick={async () => {
          try {
            removePendingFriendAt(index);
            const response = await acceptFriendshipRequest({
              to_add_user_id: sender.id,
              pending_friendship_id: id
            });
            // console.log(response);
          } catch (err) {
            console.error(err);
          }
        }}
      />
      <Decline
        onClick={async () => {
          try {
            removePendingFriendAt(index);
            const response = await denyFriendshipRequest(id)();
          } catch (err) {
            console.error(err);
          }
        }}
      />
    </Actions>
  );
};

const PendingFriendsBody = () => {
  const { isPendingFriendsShowed, pendingFriends } = React.useContext(
    FriendsContext
  );
  return (
    <>
      {isPendingFriendsShowed && (
        <FriendList>
          {pendingFriends.map(({ sender, id }, index) => (
            <PendingFriend>
              <FriendAvatar src="/images/profile.svg" />
              <FriendInfo>
                <FriendUsername>{sender.username}</FriendUsername>
                <FriendStatus>online</FriendStatus>
              </FriendInfo>
              <PendingFriendActions index={index} id={id} sender={sender} />
            </PendingFriend>
          ))}
        </FriendList>
      )}
    </>
  );
};

export const PendingFriends = () => {
  return (
    <>
      <PendingFriendsSeparator />
      <PendingFriendsBody />
    </>
  );
};

const FriendsSeparator = () => {
  const { toggleOnlineFriends, isOnlineFriendsShowed } = React.useContext(
    FriendsContext
  );

  return (
    <SectionSeparator
      onClick={() => {
        toggleOnlineFriends();
      }}
    >
      <Uparrow active={isOnlineFriendsShowed} />
      <SectionText>Online</SectionText>
    </SectionSeparator>
  );
};

export const AddFriend = () => {
  const { popupProps } = React.useContext(FriendsContext);
  return (
    <AddFriendContainer
      onClick={() => {
        popupProps.toggle();
      }}
    >
      <Plus />
    </AddFriendContainer>
  );
};

export const FriendMenu = ({ currentFriend, index }) => {
  const {
    deleteFriend,
    setFriends,
    updateAt,
    friends,
    myAdventures
  } = React.useContext(FriendsContext);
  const {
    id,
    isMenuOpen,
    isSubMenuOpen,
    SubSubMenu,
    SubSubMenuIsLoading,
    SubSubMenuIsDone,
    SubSubMenuAs
  } = currentFriend;
  const openSubMenu = () => {
    setFriends(state =>
      state.map(e => ({ ...e, isSubMenuOpen: false, SubSubMenu: null }))
    );
    updateAt(index, {
      ...currentFriend,
      isSubMenuOpen: !currentFriend.isSubMenuOpen
    });
  };
  const openSubSubMenu = subIndex => {
    updateAt(index, {
      ...currentFriend,
      SubSubMenu: currentFriend.SubSubMenu === subIndex ? null : subIndex
    });
  };
  const sendInvite = async (as, id, subIndex) => {
    if (!isFalsy(SubSubMenuIsLoading) || !isFalsy(SubSubMenuIsDone)) {
      return;
    }
    updateAt(index, {
      ...currentFriend,
      SubSubMenuIsLoading: subIndex,
      SubSubMenuAs: as
    });
    const inviteResponse = await invitePlayer({
      receiver_id: currentFriend.id,
      adventure_id: id,
      as: as === "adventurer" ? "character" : as
    });
    // console.log(inviteResponse);
    updateAt(index, {
      ...currentFriend,
      SubSubMenuIsLoading: null,
      SubSubMenuIsDone: subIndex,
      SubSubMenuAs: as
    });
    const newCurrentFriend = {
      ...currentFriend,
      pendingAdventures: [
        ...currentFriend.pendingAdventures,
        inviteResponse.data
      ]
    };
    updateAt(index, newCurrentFriend);
    setTimeout(() => {
      updateAt(index, {
        ...newCurrentFriend,
        SubSubMenuIsLoading: null,
        SubSubMenuIsDone: false
      });
    }, 1000);
  };
  const filteredMyAdventures = myAdventures
    ? myAdventures
        .filter(adventure => {
          if (currentFriend.masteringAdventures.length === 0) {
            return true;
          }
          return !currentFriend.masteringAdventures.some(e => {
            return e.id === adventure.id;
          });
        })
        .filter(adventure => {
          if (currentFriend.lobbies.length === 0) {
            return true;
          }
          return !currentFriend.lobbies.some(e => {
            return adventure.id === e.adventure_id;
          });
        })
    : [];
  const haveAdventuresToInvite = filteredMyAdventures.length > 0;
  return (
    <>
      {isMenuOpen && (
        <FriendMenuContainer>
          {haveAdventuresToInvite && (
            <FriendMenuItem onClick={openSubMenu}>
              Invite To
              <Uparrow auto active={isSubMenuOpen} />
            </FriendMenuItem>
          )}
          {myAdventures &&
            filteredMyAdventures.map((adventure, subIndex) => (
              <>
                {isSubMenuOpen && (
                  <FriendSubMenu>
                    <FriendSubMenuItem
                      onClick={() => {
                        openSubSubMenu(subIndex);
                      }}
                    >
                      {adventure.name} as:
                      <Uparrow auto active={SubSubMenu === subIndex} />
                    </FriendSubMenuItem>
                    {SubSubMenu === subIndex && (
                      <FriendSubSubMenu>
                        {adventure.isMaster && (
                          <FriendSubSubMenuItem
                            onClick={() => {
                              sendInvite("master", adventure.id, subIndex);
                            }}
                          >
                            Master
                            <FriendSubSubMenuItemLoadingBar
                              isDone={
                                SubSubMenuAs === "master" &&
                                SubSubMenuIsDone === subIndex
                              }
                              isGoing={
                                SubSubMenuAs === "master" &&
                                SubSubMenuIsLoading === subIndex
                              }
                            />
                          </FriendSubSubMenuItem>
                        )}
                        <FriendSubSubMenuItem
                          onClick={() => {
                            sendInvite("adventurer", adventure.id, subIndex);
                          }}
                        >
                          Adventurer
                          <FriendSubSubMenuItemLoadingBar
                            isDone={
                              SubSubMenuAs === "adventurer" &&
                              SubSubMenuIsDone === subIndex
                            }
                            isGoing={
                              SubSubMenuAs === "adventurer" &&
                              SubSubMenuIsLoading === subIndex
                            }
                          />
                        </FriendSubSubMenuItem>
                      </FriendSubSubMenu>
                    )}
                  </FriendSubMenu>
                )}
              </>
            ))}
          <FriendMenuItem>Chat</FriendMenuItem>
          <FriendMenuItem onClick={() => deleteFriend(id, index)}>
            Delete
          </FriendMenuItem>
        </FriendMenuContainer>
      )}
    </>
  );
};

export const FriendsBody = () => {
  const {
    isOnlineFriendsShowed,
    friends,
    popupProps,
    setFriends,
    updateAt,
    deleteFriend
  } = React.useContext(FriendsContext);

  const openMenu = (currentFriend, index) => () => {
    setFriends(state =>
      state.map(e => ({
        ...e,
        isMenuOpen: false,
        SubSubMenu: null,
        isSubMenuOpen: false
      }))
    );
    updateAt(index, {
      ...currentFriend,
      isMenuOpen: !currentFriend.isMenuOpen
    });
  };
  return (
    <>
      {isOnlineFriendsShowed && (
        <FriendList>
          <AddFriend />
          {friends.map((currentFriend, index) => {
            const {
              username: friendUsername,
              status = "default_status",
              isMenuOpen,
              id
            } = currentFriend;
            return (
              <>
                <Friend key={index} onClick={openMenu(currentFriend, index)}>
                  <FriendAvatar src="/images/profile.svg" />
                  <FriendInfo>
                    <FriendUsername>{friendUsername}</FriendUsername>
                    <FriendStatus>{status}</FriendStatus>
                  </FriendInfo>
                  <Uparrow active={isMenuOpen} />
                </Friend>
                <FriendMenu currentFriend={currentFriend} index={index} />
              </>
            );
          })}
        </FriendList>
      )}
    </>
  );
};

export const Friends = () => {
  return (
    <>
      <FriendsSeparator />
      <FriendsBody />
    </>
  );
};
