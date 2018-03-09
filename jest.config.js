const CONFIG = require('./config')

module.exports = {
    cacheDirectory: CONFIG.CACHE_DIR,
    collectCoverage: false,
    testEnvironment: "jest-env-jsdom-silent",
    collectCoverageFrom: [
        CONFIG.FILE_PATTERN,
        "!**/node_modules/**"
    ],
    coverageDirectory: CONFIG.COVERAGE_DIR,
    coverageReporters: ["lcov"],
    // setupTestFrameworkScriptFile: "./node_modules/jest-enzyme/lib/index.js",
    setupTestFrameworkScriptFile: "<rootDir>/testSetup.js",
    testMatch: [
        CONFIG.TEST_PATTERN,
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "./*.js$"
    ],
    moduleFileExtensions: [
        "js",
        "ts",
        "tsx"
    ],
    transform: {
        "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    globals: {
        "ts-jest": {
            "tsConfigFile": "src/tsconfig.json"
        },
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileMock.js",
        "\\.(css|less|scss)$": "<rootDir>/styleMock.js"
    }
}