import { expect } from 'expect-webdriverio';
import allure from '@wdio/allure-reporter';

/**
 * @param first - The first value to compare.
 * @param second - The second value to compare.
 * @param message - The error message to display if the assertion fails.
 */
export const assertNotEqual = (first: any, second: any, message: string): void => {
    try {
        expect(first).not.toEqual(second);
        allure.addStep(`Assertion passed: ${first} is not equal to ${second}`);
    } catch (e) {
        allure.addStep(`Assertion failed: ${first} is equal to ${second}`);
        throw new Error(`${message}: ${e}`);
    }
};
