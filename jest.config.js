module.exports = {
  // Specify the file extensions Jest should look for:
  moduleFileExtensions: ["js", "jsx", "json"],
  // Configure Jest to understand Webpack-specific features:
  moduleNameMapper: {
    // If you're using Webpack aliases, map them here:
    "^@alias/(.*)$": "<rootDir>/src/$1",
    // If you're using CSS Modules or other style imports, use identity-obj-proxy to mock them:
    "\\.css$": "identity-obj-proxy",
  },
  // Specify the folders Jest should not search for tests:
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  // Configure the test environment:
  testEnvironment: "jsdom",
  // Set up testing-library and jest-dom:
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
