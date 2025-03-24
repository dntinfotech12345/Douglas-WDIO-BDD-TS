import { expect } from 'expect-webdriverio';
import allure from '@wdio/allure-reporter';

/**
 * @param targetText - The text to check for the presence of the compared text.
 * @param comparedText - The text that should be found within the target text.
 * @param message - The error message to display if the assertion fails.
 */
export const expectToContain = (targetText: string, comparedText: string, message: string): void => {
    try {
        expect(targetText).toContain(comparedText);
        allure.addStep(`Assertion passed: "${targetText}" contains "${comparedText}"`);
    } catch (e) {
        allure.addStep(`Assertion failed: Expected "${targetText}" to contain "${comparedText}"`);
        throw new Error(`${message}: ${e}`);
    }
};
