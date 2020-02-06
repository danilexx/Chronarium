import { FriendsContext } from "./index";
import {
  SectionSeparator,
  SectionText,
  Uparrow,
  PendingAdventureList,
  PendingAdventure,
  AdventureInfo,
  AdventureAvatar,
  AdventureName,
  AdventureExtraInfo,
  Actions,
  Accept,
  Decline
} from "./styles";
import { acceptAdventureRequest, denyAdventureRequest } from "-/src/services";
import usePopup from "-/src/utils/hooks/usePopup";
import { MasterName } from "./popups";

const PendingAdventuresSeparator = () => {
  const {
    togglePendingAdventures,
    isPendingAdventuresShowed
  } = React.useContext(FriendsContext);

  return (
    <SectionSeparator
      onClick={() => {
        togglePendingAdventures();
      }}
    >
      <Uparrow active={isPendingAdventuresShowed} />
      <SectionText>Pending Adventures</SectionText>
    </SectionSeparator>
  );
};

const PendingAdventureActions = ({ index, id, as }) => {
  const { removePendingAdventureAt } = React.useContext(FriendsContext);
  const [, popupProps] = usePopup("info");
  const callback = ({ master_name }) => {
    return new Promise((resolve, reject) => {
      acceptAdventureRequest({
        pending_adventure_id: id,
        master_name
      })
        .then(data => {
          removePendingAdventureAt(index);
          resolve(data);
        })
        .catch(reject);
    });
  };
  const accept = async () => {
    if (as === "master") {
      popupProps.toggle(true);
    } else {
      const response = await acceptAdventureRequest({
        pending_adventure_id: id,
        master_name: ""
      });
    }
  };

  return (
    <>
      <Actions>
        <Accept onClick={accept} />
        <Decline
          onClick={async () => {
            try {
              removePendingAdventureAt(index);
              const response = await denyAdventureRequest(id)();
            } catch (err) {
              console.error(err);
            }
          }}
        />
      </Actions>
      <MasterName callback={callback} {...popupProps} />
    </>
  );
};

const PendingAdventuresBody = () => {
  const { pendingAdventures, isPendingAdventuresShowed } = React.useContext(
    FriendsContext
  );
  return (
    <>
      {isPendingAdventuresShowed && (
        <PendingAdventureList>
          {pendingAdventures &&
            pendingAdventures.map(({ adventure, id, as }, index) => (
              <PendingAdventure>
                <AdventureAvatar src="/images/adventure.jpg" />
                <AdventureInfo>
                  <AdventureName>{adventure.name}</AdventureName>
                  <AdventureExtraInfo>
                    as {as === "character" ? "adventurer" : "master"}
                  </AdventureExtraInfo>
                </AdventureInfo>
                <PendingAdventureActions index={index} id={id} as={as} />
              </PendingAdventure>
            ))}
        </PendingAdventureList>
      )}
    </>
  );
};

const PendingAdventures = () => {
  return (
    <>
      <PendingAdventuresSeparator />
      <PendingAdventuresBody />
    </>
  );
};
export default PendingAdventures;
