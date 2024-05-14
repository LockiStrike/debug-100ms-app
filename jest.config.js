module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src/'],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.svg$': 'jest-transformer-svg',
    },

    moduleNameMapper: {
        '^/(.+)': '<rootDir>/$1',
        '\\.(mp4|otf|ttf)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(jpg|jpeg|png|gif)$': 'identity-obj-proxy',
    },

    transformIgnorePatterns: ['/node_modules/(?!gsap|lodash-es)'],

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testMatch: ['<rootDir>/src/__tests__/**/*.test.+(ts|tsx)'],

    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    setupFiles: ['jest-launchdarkly-mock'],
};
