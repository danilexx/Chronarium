import { useList } from "react-use";
import { useContext } from "react";
import PlayerCard from "-/src/components/PlayerCard";
import { Container } from "./styles";
import useAwait from "-/src/utils/hooks/useAwait";
import { getUsersFromAdventure, removePlayer } from "-/src/services";
import { PlayerModel } from "-/src/services/types";
import { AdventureContext } from "-/src/components/MasterAdventurePage";
import { MenuItem, Menu } from "../../styles";
import { useStoreState } from "-/src/utils/EasyPeasy";

interface ExtentedPlayerModel extends PlayerModel {
  isMenuOpened?: boolean;
}
const getIsMe = id => player => id === player.id;
const Players = () => {
  const { adventure } = useContext(AdventureContext);
  const userId = useStoreState(state => state.user.id);
  const isMe = getIsMe(userId);
  const [isLoading, fetch] = useAwait(getUsersFromAdventure(adventure.id));
  const [players, { set, updateAt, removeAt }] = useList<ExtentedPlayerModel>(
    []
  );
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch();
        set(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fn();
  }, []);
  const handleMenu = (index: number) => {
    const currentPlayer = players[index];
    updateAt(index, {
      ...currentPlayer,
      isMenuOpened: !currentPlayer.isMenuOpened
    });
  };
  const handleDelete = async (playerId: number) => {
    const playerIndex = players.findIndex(player => player.id === playerId);
    const response = await removePlayer(adventure.id, playerId)();
    removeAt(playerIndex);
  };
  return (
    <Container>
      {players.map((player, index) => (
        <>
          <PlayerCard
            onClick={() => {
              handleMenu(index);
            }}
            me={isMe(player)}
            player={player}
            key={player.id}
          />
          {player.isMenuOpened && !isMe(player) && (
            <Menu>
              {/* <MenuItem>Update</MenuItem> */}
              <MenuItem delete onClick={() => handleDelete(player.id)}>
                Remove
              </MenuItem>
            </Menu>
          )}
        </>
      ))}
    </Container>
  );
};

export default Players;
