import { useRouter } from "next/router";
import { useStoreState } from "../EasyPeasy";
import isServer from "../isServer";

const useUserRoute = (toPath: string = "/login"): void => {
  if (isServer()) return;
  const router = useRouter();
  const isLoggedIn = useStoreState(state => state.user.isLogged);
  if (!isLoggedIn) {
    router.push(toPath);
  }
};

export default useUserRoute;
