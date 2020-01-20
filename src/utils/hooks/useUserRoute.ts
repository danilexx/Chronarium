import { useRouter } from "next/router";
import cookie from "react-cookies";
import { useStoreState } from "../EasyPeasy";
import isServer from "../isServer";

const useUserRoute = (toPath: string = "/login"): void => {
  if (isServer()) return;
  const router = useRouter();
  const token = cookie.load("token");
  const isLoggedIn = Boolean(token);

  if (!isLoggedIn) {
    router.push(toPath);
  }
};

export default useUserRoute;
