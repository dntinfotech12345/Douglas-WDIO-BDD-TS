import { expect } from 'expect-webdriverio';

export const assertDeepEqual = (first: any, second: any, message: string): void => {
    try {
        expect(first).toStrictEqual(second);
    } catch (e) {
        throw new Error(`${message}: ${e}`);
    }
};

export const assertEqual = (first: any, second: any, message: string): void => {
    try {
        expect(first).toEqual(second);
    } catch (e) {
        throw new Error(`${message}: ${e}`);
    }
};

export const assertFalse = (condition: boolean, message: string): void => {
    try {
        expect(condition).toBe(false);
    } catch (e) {
        throw new Error(`${message}: ${e}`);
    }
};

export const assertNotEqual = (first: any, second: any, message: string): void => {
    try {
        expect(first).not.toEqual(second);
    } catch (e) {
        throw new Error(`${message}: ${e}`);
    }
};

export const assertTrue = (condition: boolean, message: string): void => {
    try {
        expect(condition).toBe(true);
    } catch (e) {
        throw new Error(`${message}: ${e}`);
    }
};

export const expectToContain = (targetText: string, comparedText: string, message: string): void => {
    try {
        expect(targetText).toContain(comparedText);
    } catch (e) {
        throw new Error(`${message}: ${e}`);
    }
};
