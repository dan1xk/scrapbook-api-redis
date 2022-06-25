import configJest from './jest.config';

export const config = {
    ...configJest,
    testMatch: ['**/*.test.ts'],
};
