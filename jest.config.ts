module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/utils$": "<rootDir>/src/utils",
    "^@/api$": "<rootDir>/src/api",
    "^@/types$": "<rootDir>/src/types",
    "^@/constants$": "<rootDir>/src/constants",
  },
};
