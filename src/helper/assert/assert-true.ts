import { expect } from 'expect-webdriverio';
import allure from '@wdio/allure-reporter';

/**
 * @param condition - The boolean condition to assert.
 * @param message - The error message to display if the assertion fails.
 */
export const assertTrue = (condition: boolean, message: string): void => {
    try {
        // Perform the assertion using expect-webdriverio
        expect(condition).toBe(true);
        allure.addStep(`Assertion passed: Condition is true`);
    } catch (e) {
        allure.addStep(`Assertion failed: Expected condition to be true`);
        throw new Error(`${message}: ${e}`);
    }
};
