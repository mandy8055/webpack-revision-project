const { merge } = require("webpack-merge");
const path = require("path");
const commonConfiguration = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(commonConfiguration, {
  mode: "development",
  devtool: "source-map",
  target: "web",
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    static: path.join(__dirname, "..", "dist"),
    compress: true,
    port: 9000,
    hot: true,
  },
});
