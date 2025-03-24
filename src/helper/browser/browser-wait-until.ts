import { browser } from "@wdio/globals";

export const browserWaitUntil = async (
    condition: () => boolean | Promise<boolean>,
    timeout: number,
    timeoutMsg: string,
): Promise<void> => {
    await browser.waitUntil(condition, { timeout, timeoutMsg });
};
