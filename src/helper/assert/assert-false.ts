import { expect } from 'expect-webdriverio';
import allure from '@wdio/allure-reporter';

/**
 * @param condition - The condition to assert.
 * @param message - The error message to display if the assertion fails.
 */
export const assertFalse = (condition: boolean, message: string): void => {
    try {
        expect(condition).toBe(false);
        allure.addStep(`Assertion passed: Condition is false`);
    } catch (e) {
        allure.addStep(`Assertion failed: Condition is not false`, 'failed');
        throw new Error(`${message}: ${e}`);
    }
};
