export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  coverageProvider: "v8",
  roots: [
    "<rootDir>/tests"
  ],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  transform: {
    ".+\\.ts$": "ts-jest"
  }
};
