import configJest from "./jest.config";

export const config = {
    ...configJest,
    testMatch: ['**/*.spec.ts'],
};
