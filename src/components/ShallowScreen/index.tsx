import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, ShallowScreenContainer } from "./styles";

const ShallowContext = createContext<{
  currentScreen: string;
  setCurrentScreen: any;
  previousScreen: string;
  routes: string[];
}>({
  currentScreen: "",
  setCurrentScreen: () => {},
  previousScreen: "",
  routes: []
});
interface Props {
  children: React.ReactNode;
  routes: string[];
  onChange?: (index: number) => void;
}
const ShallowScreens: React.FC<Props> = ({
  routes = [],
  children,
  onChange
}) => {
  const [currentScreen, setCurrentScreen] = useState(routes[0]);
  const router = useRouter();
  useEffect(() => {
    setCurrentScreen(router.query.step as string);
  }, [router, setCurrentScreen]);

  const previousScreen = React.useMemo(() => {
    const index = routes.findIndex(e => e === currentScreen);
    return routes[index - 1];
  }, [routes, currentScreen]);

  useEffect(() => {
    if (!onChange) return;
    onChange(routes.findIndex(e => e === currentScreen));
  });
  return (
    <ShallowContext.Provider
      value={{ currentScreen, setCurrentScreen, previousScreen, routes }}
    >
      <Container>{children}</Container>
    </ShallowContext.Provider>
  );
};

export const ShallowScreen = ({ route, children }) => {
  const {
    currentScreen,
    setCurrentScreen,
    previousScreen,
    routes
  } = useContext(ShallowContext);
  const isActive = route === currentScreen;
  return (
    <ShallowScreenContainer
      isActive={isActive}
      index={routes.findIndex(e => e === route)}
    >
      {isActive && children}
    </ShallowScreenContainer>
  );
};

export default ShallowScreens;
