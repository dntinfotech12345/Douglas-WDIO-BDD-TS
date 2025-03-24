import { ClickOptions, ChainablePromiseElement } from 'webdriverio';
import { timeouts } from '../../config/timeouts-config';
import { browserWaitUntil } from '../helper/browser/browser-wait-until';
import { assertEqual } from '../helper/assert/assert-equal';
import { browser, expect } from '@wdio/globals';

export class ElementControl {
    public el: ChainablePromiseElement;

    constructor(el: ChainablePromiseElement) {
        this.el = el;
    }

    public async getParentElement(): Promise<ChainablePromiseElement> {
        return this.el.$('..');
    }

    /**
     * Actions
     */
    public async click(clickOptions?: ClickOptions): Promise<void> {
        await this.scrollIntoView();
        await this.waitForClickable(timeouts.huge, `Element with selector: ${await this.el.selector} is not clickable`);
        await this.el.click(clickOptions);
    }

    public async doubleClickCustom(): Promise<void> {
        await this.scrollIntoView();
        await this.el.doubleClick();
    }

    public async getText(trim: boolean = false): Promise<string> {
        await this.scrollIntoView();
        const text: string = await this.el.getText();
        return trim ? text.trim() : text;
    }

    public async getValue(): Promise<string> {
        return this.el.getValue();
    }

    public async getAttribute(attributeName: string): Promise<string> {
        return this.el.getAttribute(attributeName);
    }

    public async scrollIntoView(): Promise<void> {
        if (!(await this.isDisplayedInViewport())) {
            await this.el.scrollIntoView();
        }
    }

    public async scrollIntoViewTop(): Promise<void> {
        await this.el.scrollIntoView({ block: 'start' });
    }

    public async isDisplayedInViewport(): Promise<boolean> {
        return browser.execute((element) => {
            const el = element as unknown as HTMLElement;
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }, await this.el);
    }

    /**
     * Boolean
     */
    public async isDisplayed(): Promise<boolean> {
        return this.el.isDisplayed();
    }

    /**
     * Waits
     */
    public async waitForDisplayed(timeout: number, timeoutMsg: string): Promise<void> {
        await this.el.waitForDisplayed({ timeout, timeoutMsg });
    }

    public async waitForClickable(timeout: number, timeoutMsg: string): Promise<void> {
        await browserWaitUntil(async () => this.el.isClickable(), timeout, timeoutMsg);
    }

    public async waitForNotDisplayed(timeout: number, timeoutMsg: string): Promise<void> {
        await this.el.waitForDisplayed({ timeout, timeoutMsg, reverse: true });
    }

    public async waitToHaveAnyText(timeout: number, timeoutMsg: string): Promise<void> {
        await browserWaitUntil(async () => (await this.getText()) !== '', timeout, timeoutMsg);
    }

    public async waitToHaveText(text: string, timeout: number, timeoutMsg: string, trim: boolean = true): Promise<void> {
        try {
            await browserWaitUntil(async () => {
                let currentText = await this.getText();
                return trim ? currentText.trim() === text : currentText === text;
            }, timeout, timeoutMsg);
        } catch (e: any) {
            throw new Error(`${e.message}. Expected text: ${text}. Actual text: ${await this.getText()}`);
        }
    }

    /**
     * Assertions
     */
    public async expectToBeDisplayed(errorMsg: string): Promise<void> {
        await expect(this.el).toBeDisplayed({ message: errorMsg });
    }

    public async expectNotToBeDisplayed(errorMsg: string): Promise<void> {
        await expect(this.el).not.toBeDisplayed({ message: errorMsg });
    }

    public async expectNotToBeExist(errorMsg: string): Promise<void> {
        await expect(this.el).not.toExist({ message: errorMsg });
    }

    public async expectToHaveText(text: string, options?: ExpectWebdriverIO.StringOptions): Promise<void> {
        await expect(this.el).toHaveText(text, options);
    }

    public async expectToHaveAttribute(
        attribute: string,
        value?: string,
        options?: ExpectWebdriverIO.StringOptions,
    ): Promise<void> {
        await expect(this.el).toHaveAttribute(attribute, value, options);
    }

    public async expectToHaveClassContaining(
        className: string,
        options?: ExpectWebdriverIO.StringOptions,
    ): Promise<void> {
        await expect(this.el).toHaveElementClass(className, options);
    }

    public async expectedToHaveClassNotContaining(className: string): Promise<void> {
        assertEqual((await this.getAttribute('class')).indexOf(className), -1, `Class contains ${className}`);
    }

    public async expectToBeEnabled(errorMsg: string): Promise<void> {
        await expect(this.el).toBeEnabled({ message: errorMsg });
    }

    public async expectToBeDisabled(errorMsg: string): Promise<void> {
        await expect(this.el).toBeDisabled({ message: errorMsg });
    }

    public async expectToHaveChildren(numberOptions: ExpectWebdriverIO.NumberOptions): Promise<void> {
        await expect(this.el).toHaveChildren(numberOptions);
    }
}
