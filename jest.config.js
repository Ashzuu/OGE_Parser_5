module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: './tsconfig.test.json'
        }],
    },
    verbose: true,
    setupFiles: ["<rootDir>/Tests/Mocks/jest.setup.ts"],
};