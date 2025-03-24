import { expect } from 'expect-webdriverio';
import allure from '@wdio/allure-reporter';

export const assertNotEqual = (first: any, second: any, message: string): void => {
    try {
        expect(first).not.toEqual(second);
        allure.addStep(`Assertion passed: ${first} is not equal to ${second}`);
    } catch (e) {
        allure.addStep(`Assertion failed: ${first} is equal to ${second}`);
        throw new Error(`${message}: ${e}`);
    }
};
