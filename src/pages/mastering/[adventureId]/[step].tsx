import MasteringAdventure from "-/src/components/MasteringAdventure";
import { getAdventure } from "-/src/services";

const master: any = MasteringAdventure;

master.getInitialProps = async (ctx: any) => {
  const response = await getAdventure(ctx.query.adventureId)(ctx);
  return { adventure: response.data };
};

export default master;
