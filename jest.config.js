const config = {
    "preset": "react-native",
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
}

module.exports = config