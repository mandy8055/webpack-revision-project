const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");

module.exports = merge(commonConfiguration, {
  mode: "production",
  target: "browserslist",
  performance: {
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
    hints: "error",
    assetFilter: function (assetFilename) {
      return !assetFilename.endsWith(".png");
    },
  },
});
