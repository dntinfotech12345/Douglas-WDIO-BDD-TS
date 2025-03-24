import { $, browser } from "@wdio/globals";
import { ElementControl } from "../base-controls/element-control";
import { timeouts } from "../../config/timeouts-config";
import { assertData } from "../../data/test-data";

class HomePage {

    protected async getHeadingTabNameEl(headingTabName: string): Promise<ElementControl> {
        return new ElementControl(await $('//li[@class="navigation-main-entry"]/a[text()="PARFUM"]'));
    };

    protected async getAcceptAllEl(): Promise<ElementControl> {
        return await new ElementControl(await $('[data-testid="uc-accept-all-button"]'));
    };
    
    public async verifyHomePageUrl(): Promise<void> {
        const currentURL = await browser.getUrl();
        await currentURL.includes(assertData.homePage.title);
    }

    public async acceptCookies(): Promise<void> {
        const acceptButton = await this.getAcceptAllEl();
        await acceptButton.waitForClickable(timeouts.huge, 'accept all button is not clickable');
        await acceptButton.click();
    }

    public async clickOnHeadlineTab(headingTabName: string): Promise<void> {
        const headingTab = this.getHeadingTabNameEl(headingTabName);
        await (await headingTab).click();
    }
}

export const homePage = new HomePage();