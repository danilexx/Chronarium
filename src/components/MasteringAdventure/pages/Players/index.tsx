import { useList } from "react-use";
import { useContext } from "react";
import PlayerCard from "-/src/components/PlayerCard";
import { Container } from "./styles";
import useAwait from "-/src/utils/hooks/useAwait";
import { getUsersFromAdventure } from "-/src/services";
import { PlayerModel } from "-/src/services/types";
import { AdventureContext } from "-/src/components/MasteringAdventure";
import { MenuItem, Menu } from "../../styles";

interface ExtentedPlayerModel extends PlayerModel {
  isMenuOpened?: boolean;
}
const Players = () => {
  const { adventure } = useContext(AdventureContext);
  const [isLoading, fetch] = useAwait(getUsersFromAdventure(adventure.id));
  const [players, { set, updateAt }] = useList<ExtentedPlayerModel>([]);
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch();
        console.log(response.data);
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
  return (
    <Container>
      {players.map((player, index) => (
        <>
          <PlayerCard
            onClick={() => {
              handleMenu(index);
            }}
            player={player}
            key={player.id}
          />
          {player.isMenuOpened && (
            <Menu>
              <MenuItem>Update</MenuItem>
              <MenuItem delete>Delete</MenuItem>
            </Menu>
          )}
        </>
      ))}
    </Container>
  );
};

export default Players;
