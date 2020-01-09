const path = require("path");
// next.config.js
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack: config => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias["-"] = path.resolve(__dirname);
    return config;
  },
  env: {
    SERVER_URL: "http://localhost:3333"
  },
  cssLoaderOptions: {
    url: false
  }
});
