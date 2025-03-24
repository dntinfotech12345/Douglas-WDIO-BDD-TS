# Douglas Automation Project

This project is an end-to-end test automation framework for the Douglas website using WebdriverIO and Cucumber.

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd Douglas

   Install dependencies:
   npm install

Create a .env file in the root directory and configure the required environment variables. You can use the provided .env file as a reference.

# Running Tests
To execute the tests, use the following command:
npm run parfum

This will run the tests tagged with @parfum.

# Generating Allure Reports
After running the tests, generate the Allure report:

allure generate allure-results --clean

# Open the report:
npm run report

# Project Structure
src/: Contains the source code for the test framework.
config/: Configuration files for the project.
allure-results/: Stores the test results for Allure reporting.
logs/: Contains logs generated during test execution.

# License
This project is licensed under the ISC License.