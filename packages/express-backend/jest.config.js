export default {
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "models/**/*.js", // Track all models
    "services/**/*.js", // Track all service files
    "!**/node_modules/**" // Ignore dependencies
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
