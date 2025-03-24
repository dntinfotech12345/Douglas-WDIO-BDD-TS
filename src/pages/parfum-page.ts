import { $, browser } from "@wdio/globals";
import logger from "../helper/logger";
import { timeouts } from "../../config/timeouts-config";
import { ElementControl } from "../base-controls/element-control";
import { assertData } from "../../data/assert-data";
import { assertEqual } from "../helper/assert/assert-equal";

class ParfumPage {

    protected async getTitleEl(): Promise<ElementControl> {
        return await new ElementControl(await $('//h1[@class="headline-bold product-overview__headline"]'));
    };

    protected async getFacetListEl(dropdownValue: string): Promise<ElementControl> {
        return new ElementControl(await $(`//div[@class="facet__title" and text()="${dropdownValue}"]`));
    };

    protected async getZusatzstoffeFacetOptionEl(facetOption: string): Promise<ElementControl> {
        return await new ElementControl(await $(`//div[@class="facet-option__label"]//div[text()="${facetOption}"]`));
    };

    protected async getSelectedFacetsValueEl(facetOption: string): Promise<ElementControl> {
        return await new ElementControl(await $(`//button[@class="selected-facets__value" and text()="${facetOption}"]`));
    };

    public async waitForDisplay(): Promise<void> {
        await (await this.getTitleEl()).waitForDisplayed(timeouts.huge, 'Parfume title is not displayed')
    }

    public async verifyParfumPageUrlAndTitle(): Promise<void> {
        const currentURL = await browser.getUrl();
        await currentURL.includes(assertData.parfumPage.parfumPageUrl);

        const title = await (await this.getTitleEl()).getText();
        await title.includes(assertData.parfumPage.title);
    }

    public async selectParfumPageDropdown(dropdownValue: string): Promise<void> {
        await (await this.getFacetListEl(dropdownValue)).waitForClickable(timeouts.huge, 'Facet list is not clickable');
        await (await this.getFacetListEl(dropdownValue)).click();
    }

    public async selectDropdownOption(filterOption: string): Promise<void> {
        logger.info(`Selecting dropdown filter option: ${filterOption}`);
        const facetElement = await this.getZusatzstoffeFacetOptionEl(filterOption);
        if (!facetElement) {
            throw new Error(`Filter option '${filterOption}' not found`);
        }
        await facetElement.click();
        logger.info(`Dropdown filter option '${filterOption}' selected`);
    }

    public async verifyFilterOptionApplied(filterOption: string): Promise<void> {
        const selectedFacet = (await this.getSelectedFacetsValueEl(filterOption));
        await selectedFacet.waitForDisplayed(timeouts.huge, `Selected facet option: ${filterOption} is not displayed`);
        const selectedFacetText = await selectedFacet.getText();
        await assertEqual(selectedFacetText, filterOption, `Selected facet option: ${filterOption} is not displayed`);
    }
}

export const parfumPage = new ParfumPage();
