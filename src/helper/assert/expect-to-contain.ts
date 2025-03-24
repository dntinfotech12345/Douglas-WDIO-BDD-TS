import { expect } from 'expect-webdriverio';
import allure from '@wdio/allure-reporter';

export const expectToContain = (targetText: string, comparedText: string, message: string): void => {
    try {
        expect(targetText).toContain(comparedText);
        allure.addStep(`Assertion passed: "${targetText}" contains "${comparedText}"`);
    } catch (e) {
        allure.addStep(`Assertion failed: Expected "${targetText}" to contain "${comparedText}"`);
        throw new Error(`${message}: ${e}`);
    }
};
