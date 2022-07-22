var base = require('./jest.config.vue2.js')

module.exports = {
  "rootDir": "../",
  "moduleFileExtensions": ["js", "vue"],
  "testTimeout": 1000,
  "testEnvironment": "jsdom",
  
  "transformIgnorePatterns": [
      "/node_modules/"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
      "**/src/**/*.{js,vue}",
  ],
  "coverageReporters": [
      "html",
      "text-summary",
      "clover",
      "json"
  ],
  "transform": {
      ".*\\.(vue)$":  "vue-next-jest",
      "^.+\\.js$": "babel-jest",
  },
  "moduleNameMapper": {
      "^@vue/test-utils$": "<rootDir>/node_modules/vue-next-test-utils",
      "^vue$": "<rootDir>/node_modules/vue-next",
      '^vue-jest$': "<rootDir>/node_modules/vue-next-jest",
      '^unit-test-helpers$': "<rootDir>/tests/unit/helpers/vue3"
  },
}