const path = require("path");
// next.config.js
const withCSS = require("@zeit/next-css");
require("dotenv").config();
const webpack = require("webpack");

module.exports = withCSS({
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias["-"] = path.resolve(__dirname);
    return config;
  },
  cssLoaderOptions: {
    url: false
  }
});
