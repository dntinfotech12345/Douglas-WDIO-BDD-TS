import { browser } from "@wdio/globals";

export const browserOpenUrl = async (url: string): Promise<void> => {
    await browser.reloadSession();
    await browser.maximizeWindow();
    await browser.url(url);
    console.log(await browser.getUrl());
};
