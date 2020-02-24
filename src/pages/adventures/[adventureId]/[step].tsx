import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAdventure } from "-/src/services";
import { useStoreState } from "-/src/utils/EasyPeasy";
import { AdventureModel, MasterModel } from "-/src/services/types";
import getAdventurePush from "-/src/utils/getAdventurePush";
import isServer from "-/src/utils/isServer";
import NormalAdventurePage from "-/src/components/NormalAdventurePage";

interface ExpandedAdventureModel extends AdventureModel {
  masters: MasterModel[];
}

const MasterAdventurePage: any = dynamic(() =>
  import("-/src/components/MasterAdventurePage")
);
const master = ({ adventure: initialAdventure, error }) => {
  const user = useStoreState(state => state.user);
  const router = useRouter();
  const [adventure] = useState<ExpandedAdventureModel>(initialAdventure);
  if (adventure) {
    const isMaster = adventure.masters.some(e => e.user_id === user.id);
    if (isMaster) {
      return <MasterAdventurePage adventure={adventure} />;
    }
    return <NormalAdventurePage adventure={adventure} />;
  }
  if (error) {
    return <>sorry</>;
  }
  return null;
};

master.getInitialProps = async (ctx: any) => {
  try {
    const response = await getAdventure(ctx.query.adventureId)(ctx);
    return { adventure: response.data };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
};

export default master;
