import { Portal } from "react-portal";
import {
  PlayerRow,
  PlayerImage,
  PlayerName,
  Attribute,
  FixedInfo,
  SkillIcon
} from "./styles";
import Tooltip from "-/src/components/Tooltip";
import { PlayerModel } from "-/src/services/types";
// import { PlayerTooltip } from "-/src/components/tooltips";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  player: PlayerModel;
}
const PlayerCard: React.FC<Props> = ({ player, ...props }) => {
  // const { skills, main_attribute_value, main_attribute } = player;
  return (
    <>
      {/* <Portal>
        <Tooltip
          id={`player:${player.id}`}
          multline
          place="top"
          effect="solid"
          getContent={() => <PlayerTooltip player={player} />}
        />
      </Portal> */}
      <PlayerRow data-for="player:0" data-tip {...props}>
        <PlayerImage src="/images/profile.svg" />
        <PlayerName>
          {player.username}
          {player.master &&
            ` ( ${player.isOwner ? "Owner:" : "Master:"} ${
              player.master.name
            } )`}
          {player.character && ` ( Character: ${player.character.name} )`}
        </PlayerName>
        {/* <FixedInfo>
          <Attribute
            data-for={`attribute${player.id}`}
            data-tip
            instance={main_attribute}
          />
        </FixedInfo> */}
      </PlayerRow>
    </>
  );
};

export default PlayerCard;
