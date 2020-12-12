module.exports = {
  "rootDir": "../",
  "moduleFileExtensions": [
      "js",
      "json",
      "vue"
  ],
  "testTimeout": 1000,
  "transform": {
      ".*\\.(vue)$": "vue-prev-jest",
      "^.+\\.js$": "babel-jest"
  },
  "transformIgnorePatterns": [
      "/node_modules/"
  ],
  "moduleNameMapper": {
      "^composition-api$": "<rootDir>/node_modules/vue-prev-composition-api",
      "^@vue/test-utils$": "<rootDir>/node_modules/vue-prev-test-utils",
      "^vue$": "<rootDir>/node_modules/vue-prev",
      '^vue-jest$': "<rootDir>/node_modules/vue-prev-jest",
      '^unit-test-helpers$': "<rootDir>/tests/unit/helpers/vue2"
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
      "**/src/**/*.{js,vue}",
  ],
  "coverageReporters": [
      "html",
      "text-summary",
      "clover",
      "json"
  ]
}