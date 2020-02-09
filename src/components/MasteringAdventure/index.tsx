import { createContext } from "react";
import { getAdventure } from "-/src/services";
import { Column } from "-/src/components/shared";
import { Home, Scenes, Items, Skills, CreateSkill } from "./pages";
import { Navigator } from "./sub";
import ShallowScreens, { ShallowScreen } from "-/src/components/ShallowScreen";

export const AdventureContext = createContext<{ adventure: any }>({
  adventure: null
});

const MasteringAdventure = ({ adventure }) => {
  return (
    <Column isFull>
      <Navigator />
      <AdventureContext.Provider value={{ adventure }}>
        <ShallowScreens
          routes={["home", "scenes", "items", "skills", "create-skill"]}
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

export default MasteringAdventure;
