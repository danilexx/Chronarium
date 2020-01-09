import App from "next/app";
import React from "react";
import { Provider as UrlProvider } from "use-http";
import { Router } from "next/router";
import styled, { ThemeProvider } from "-/src/utils/StyledComponents";
import { GlobalStyles } from "-/src/utils/GlobalStyles";
import { theme } from "-/src/utils/theme";
import Nav from "-/src/components/Nav";
import Fonts from "-/src/utils/fonts";

if (process.env.NODE_ENV !== "production") {
  Router.events.on("routeChangeComplete", () => {
    const path = "/_next/static/chunks/styles.chunk.css";
    const chunksSelector = `link[href*="${path}"]:not([rel=preload])`;
    const chunksNodes: any = document.querySelectorAll(chunksSelector);
    if (chunksNodes.length) {
      const timestamp = new Date().valueOf();
      chunksNodes[0].href = `${path}?ts=${timestamp}`;
    }
  });
}

export default class MyApp extends App {
  componentDidMount() {
    Fonts();
  }

  render() {
    const { Component, pageProps = {} } = this.props;
    return (
      <UrlProvider url={process.env.SERVER_URL}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Nav />
          <Component {...pageProps} />
        </ThemeProvider>
      </UrlProvider>
    );
  }
}
