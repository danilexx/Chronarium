import { createContext } from "react";
import { useRouter } from "next/router";
import { getAdventure } from "-/src/services";
import { Column } from "-/src/components/shared";
import ShallowScreens, { ShallowScreen } from "-/src/components/ShallowScreen";
import { AdventureModel } from "-/src/services/types";
import { useStoreState } from "-/src/utils/EasyPeasy";
import getAdventurePush from "-/src/utils/getAdventurePush";
import NewCharacter from "../NewCharacter";

interface Props {
  children: React.ReactNode;
  route: string;
}

const RouterPage: React.FC<Props> = ({ children, ...props }) => (
  <ShallowScreen {...props}>{children}</ShallowScreen>
);
export const AdventureContext = createContext<{
  adventure: AdventureModel;
}>({
  adventure: {
    id: 0,
    name: "",
    description: "",
    hasPassword: false,
    lobby: {
      id: 0,
      maxPlayers: 0
    },
    owner_id: 0
  }
});
const NormalAdventurePage = ({ adventure }) => {
  const router = useRouter();
  const user = useStoreState(state => state.user);
  const haveCharacter = React.useMemo(
    () => adventure.characters.some(e => e.user_id === user.id),
    [adventure]
  );
  React.useEffect(() => {
    if (!haveCharacter) {
      getAdventurePush(router)("character-creation");
    }
  }, [haveCharacter]);
  return (
    <>
      <Column isFull>
        <AdventureContext.Provider value={{ adventure }}>
          <ShallowScreens routes={["character-creation"]}>
            <RouterPage route="character-creation">
              <NewCharacter />
            </RouterPage>
          </ShallowScreens>
        </AdventureContext.Provider>
      </Column>
    </>
  );
};

export default NormalAdventurePage;
