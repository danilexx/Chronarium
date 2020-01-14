import { useRouter } from "next/router";
import { useStoreState } from "../EasyPeasy";

const useGuestRoute = (toPath: string = "/"): void => {
  const router = useRouter();
  const isLoggedIn = useStoreState(state => state.user.isLogged);
  if (isLoggedIn) {
    router.push(toPath);
  }
};

export default useGuestRoute;
