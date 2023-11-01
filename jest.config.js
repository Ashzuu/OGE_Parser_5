module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.test.json'
        }
    }
};
