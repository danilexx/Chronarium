import App from "next/app";
import React from "react";
import { Provider as UrlProvider } from "use-http";
import { Router } from "next/router";
import withRedux from "next-redux-wrapper";
import { StoreProvider } from "easy-peasy";
import styled, { ThemeProvider } from "-/src/utils/StyledComponents";
import { GlobalStyles } from "-/src/utils/GlobalStyles";
import { theme } from "-/src/utils/theme";
import Nav from "-/src/components/Nav";
import Fonts from "-/src/utils/fonts";
import { makeStore } from "-/src/store";

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
  componentDidMount() {
    Fonts();
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
      <UrlProvider url={process.env.server_url}>
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
