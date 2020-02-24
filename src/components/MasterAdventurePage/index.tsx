import { createContext } from "react";
import { getAdventure } from "-/src/services";
import { Column } from "-/src/components/shared";
import {
  Home,
  Scenes,
  Items,
  Skills,
  CreateSkill,
  CreateItem,
  Players
} from "./pages";
import { Navigator } from "./sub";
import ShallowScreens, { ShallowScreen } from "-/src/components/ShallowScreen";
import { AdventureModel } from "-/src/services/types";

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

const AdventurePage = ({ adventure }) => {
  return (
    <Column isFull>
      <Navigator />
      <AdventureContext.Provider value={{ adventure }}>
        <ShallowScreens
          routes={[
            "home",
            "scenes",
            "items",
            "skills",
            "create-skill",
            "create-item",
            "players"
          ]}
        >
          <RouterPage route="home">
            <Home />
          </RouterPage>
          <RouterPage route="scenes">
            <Scenes />
          </RouterPage>
          <RouterPage route="items">
            <Items />
          </RouterPage>
          <RouterPage route="skills">
            <Skills />
          </RouterPage>
          <RouterPage route="create-skill">
            <CreateSkill />
          </RouterPage>
          <RouterPage route="create-item">
            <CreateItem />
          </RouterPage>
          <RouterPage route="players">
            <Players />
          </RouterPage>
        </ShallowScreens>
      </AdventureContext.Provider>
    </Column>
  );
};

interface Props {
  children: React.ReactNode;
  route: string;
}

const RouterPage: React.FC<Props> = ({ children, ...props }) => (
  <ShallowScreen {...props}>{children}</ShallowScreen>
);

export default AdventurePage;
