import { useRouter } from "next/router";
import cookie from "react-cookies";
import { useStoreState } from "../EasyPeasy";

const useGuestRoute = (toPath: string = "/"): void => {
  const router = useRouter();
  const token = cookie.load("token");
  const isLoggedIn = Boolean(token);

  if (isLoggedIn) {
    router.push(toPath);
  }
};

export default useGuestRoute;
