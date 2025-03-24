import { expect } from 'expect-webdriverio';
import allure from '@wdio/allure-reporter';

export const assertDeepEqual = (first: any, second: any, message: string): void => {
    try {
        expect(first).toStrictEqual(second);
        allure.addStep(`Assertion passed: ${first} equals ${second}`);
    } catch (e) {
        allure.addStep(`Assertion failed: Expected ${first} to equal ${second}`);
        throw new Error(`${message}: ${e}`);
    }
};