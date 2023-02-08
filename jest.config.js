const config = {
    preset: "jest-expo",

    testPathIgnorePatterns: [
        '/node_modules',
        '/android',
        '/ios'
    ],

    setupFilesAfterEnv: [
        "@testing-library/jest-native/extend-expect",
        "jest-styled-components"
    ],

    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|react-native-responsive-fontsize|native-base|react-native-svg)"
    ],

    setupFiles: ["./jestSetupFile.js"],

    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.tsx",
        "!src/**/*.spec.tsx",
    ],
    coverageReporters: [
        "lcov"
    ]
}

module.exports = config