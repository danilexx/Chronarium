import App from "next/app";
import React from "react";
import { Provider as UrlProvider } from "use-http";
import cookie from "react-cookies";
import withRedux from "next-redux-wrapper";
import { StoreProvider } from "easy-peasy";
import dynamic from "next/dynamic";
import { ThemeProvider } from "-/src/utils/StyledComponents";
import { GlobalStyles } from "-/src/utils/GlobalStyles";
import { theme } from "-/src/utils/theme";
import Fonts from "-/src/utils/fonts";
import { makeStore } from "-/src/store";
import isJwtExpiry from "../utils/isJwtExpiry";
import { getNewToken } from "../services";

const Nav = dynamic(() => import("-/src/components/Nav"), { ssr: false });

if (process.env.NODE_ENV !== "production") {
  // Router.events.on("routeChangeComplete", () => {
  //   const path = "/_next/static/chunks/styles.chunk.css";
  //   const chunksSelector = `link[href*="${path}"]:not([rel=preload])`;
  //   const chunksNodes: any = document.querySelectorAll(chunksSelector);
  //   if (chunksNodes.length) {
  //     const timestamp = new Date().valueOf();
  //     chunksNodes[0].href = `${path}?ts=${timestamp}`;
  //   }
  // });
}
interface it {
  Component: any;
  ctx: any;
}

// eslint-disable-next-line import/no-mutable-exports
export let store: any;
class MyApp extends App<{ store: any }> {
  async componentDidMount() {
    Fonts();

    // if (isExpiry) {
    // if (!refreshToken) return;
    //  TODO: Testar essa budega
    try {
      let token = cookie.load("token");
      const refreshToken = cookie.load("refresh_token");
      if (!token) return;
      const isExpiry = isJwtExpiry(token);
      if (isExpiry) {
        if (!refreshToken) return;
        const response = await getNewToken({ refresh_token: refreshToken });
        token = response.data.token;
        cookie.save("token", token, { path: "/" });
      }
      this.props.store.getActions().user.setUser({ token });
    } catch (err) {
      cookie.remove("token");
      cookie.remove("refresh_token");
      console.error(err);
    }
    // cookie.save("token", token, { path: "/"});
    // }
  }

  static async getInitialProps({ Component, ctx }: it) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  constructor(props: any) {
    super(props);
    store = props.store;
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { Component, pageProps = {}, store } = this.props;
    return (
      <UrlProvider url={process.env.SERVER_URL}>
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Nav />
            <Component {...pageProps} />
          </ThemeProvider>
        </StoreProvider>
      </UrlProvider>
    );
  }
}

export default withRedux(makeStore, { debug: false })(MyApp);
