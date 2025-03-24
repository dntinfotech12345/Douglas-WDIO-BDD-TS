import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();
const debug: boolean = process.env.DEBUG === 'true'


export const config: WebdriverIO.Config = {

    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: [
        './src/tests/**/*.feature'
    ],
    
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    maxInstances: 10,
    
    capabilities: [{
        browserName: 'chrome'
    }],

     logLevel: debug ? "info" : "error",
    
    bail: 0,
   
    waitforTimeout: 15000,
    
    connectionRetryTimeout: 150000,
    
    connectionRetryCount: 3,
    
    framework: 'cucumber',

    reporters:
        [
            'spec',
            [
                'allure', {
                    outputDir: 'allure-results',
                    useCucumberStepReporter: true,
                    disableWebdriverStepsReporting: true,
                    disableWebdriverScreenshotsReporting: false,
                    reportedEnvironmentVars: {
                        'ENVIRONMENT': "QA",
                        'BUILD_VERSION': '1.0.0',
                        'PLATFORM': 'Window'
                    }
                }
            ]
        ],

    cucumberOpts: {
               require: ['./src/steps/**/*.ts'],
       
        backtrace: false,
         requireModule: [],
        dryRun: false,
        failFast: false,
        
        name: [],
       
        snippets: true,
       
        source: true,
        
        strict: false,
              tagExpression: '@parfum',
         timeout: 60000,
        
        ignoreUndefinedDefinitions: false
    },

    onPrepare: function (_config, _capabilities) {
        console.log('🗑️ Clearing Allure reports before execution...');
        if (process.env.RUNNER === "LOCAL" && fs.existsSync("./allure-results")) {
            fs.rmdirSync("./allure-results", { recursive: true });
            console.log('✅ Allure reports cleared!');
        }
    },
   
    afterStep: async function (_step, _scenario, _result, _context) {
        await browser.takeScreenshot();
    },
   
}
