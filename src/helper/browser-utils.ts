import { browser } from "@wdio/globals";

export const browserGetUrl = async (): Promise<string> => {
    return await browser.getUrl();
};

export const browserGetWindowHandles = async (): Promise<string[]> => {
    return await browser.getWindowHandles();
};

export const browserKeys = async (value: string | string[]): Promise<void> => {
    await browser.keys(value);
};

export const browserOpenUrl = async (url: string): Promise<void> => {
    await browser.reloadSession();
    await browser.maximizeWindow();
    await browser.url(url);
    console.log(await browser.getUrl());
};

export const browserSwitchToWindow = async (handle: string): Promise<void> => {
    await browser.switchToWindow(handle);
};

export const browserWaitUntil = async (
    condition: () => boolean | Promise<boolean>,
    timeout: number,
    timeoutMsg: string
): Promise<void> => {
    await browser.waitUntil(condition, { timeout, timeoutMsg });
};
