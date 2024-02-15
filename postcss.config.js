module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-preset-env")({
      // Customize postcss-preset-env settings here, if needed
      // For example, you can set the 'stage' option to specify which CSS features to polyfill
      // stage: 3, // Default value, includes most stable CSS features
    }),
  ],
};
