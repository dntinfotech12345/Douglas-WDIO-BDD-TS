import { Given, When, Then } from '@cucumber/cucumber';
import logger from '../helper/logger';
import { homePage } from '../pages/home-page';
import { parfumPage } from '../pages/parfum-page';
import { configs } from '../../config/environment-config';
import { browserOpenUrl } from '../helper/browser-utils';

Given(/^I am on the home page$/, async () => {

    await browserOpenUrl(configs.douglasURL);

    logger.info('Validating the home page URL contains dashboard identifier');
    await homePage.verifyHomePageUrl();

    logger.info("Click on 'accept all' cookies button");
    await homePage.acceptCookies();
    logger.info("Accepted all cookies");
});

When(/^I navigate to the "([^"]*)" page by clicking the "([^"]*)" tab$/, async (pageName: string, headingTabName: string) => {
    logger.info(`Clicking on the ${headingTabName} tab`);
    await homePage.clickOnHeadlineTab(headingTabName);
    await parfumPage.waitForDisplay();
});


Then(/^I should be on the "([^"]*)" page$/, async (pageName: string,) => {
    logger.info(`Validating the url and title of the ${pageName} page`);
    await parfumPage.verifyParfumPageUrlAndTitle();
});


When(/^I open the "([^"]*)" dropdown$/, async (dropdownOption: string) => {
    logger.info(`Selecting the dropdown option: ${dropdownOption}`);
    await parfumPage.selectParfumPageDropdown(dropdownOption);
});


When(/^I select the "([^"]*)" filter option$/, (filterOption: string) => {
    logger.info(`Selecting the filter option: ${filterOption}`);
    parfumPage.selectDropdownOption(filterOption);
});


Then(/^the "([^"]*)" filter should be applied successfully$/, async (filterOption: string) => {
    await parfumPage.verifyFilterOptionApplied(filterOption);
    logger.info(`Validating that the filter option: ${filterOption} is applied successfully`);
});
