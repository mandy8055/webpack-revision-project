const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[contenthash].[name].css",
  }),
  new ESLintWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.s?[ac]?ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputting images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins,
  output: {
    filename: "[contenthash].bundle.js",
    path: path.resolve(__dirname, "..", "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
};
