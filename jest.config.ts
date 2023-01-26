const config = {
    "preset": "react-native",
    testPathIgnorePatterns: [
        '/node_modules',
        '/android',
        '/ios'
    ],
    "setupFilesAfterEnv": [
        "@testing-library/jest-native/extend-expect"
    ]
}

module.exports = config