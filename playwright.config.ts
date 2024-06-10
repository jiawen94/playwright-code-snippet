import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


// Read from default ".env" file.
dotenv.config();

// Alternatively, read from "../my.env" file.
dotenv.config({ path: path.resolve(__dirname, '.', '.env') });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({


  /**Timeout for each test in milliseconds. Defaults to 30 seconds. */
  timeout: 3 * 60 * 1000,

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:

    [
      ['list'],
      //['html'],


      ['monocart-reporter', {

        // the report name
        name: `${process.env.MODEL}_${process.env.MODULE}_${process.env.ENGINE_NAME} `,

        // the output file path (relative process.cwd)
        outputFile: './test-results/report.html',

        mermaid: {
          // mermaid script url, using mermaid CDN: https://www.jsdelivr.com/package/npm/mermaid
          scriptSrc: 'https://cdn.jsdelivr.net/npm/mermaid@latest/dist/mermaid.min.js',
          // mermaid config: https://mermaid.js.org/config/schema-docs/config.html
          config: {
            startOnLoad: false
          }
        },

        // attachment path handler
        attachmentPath: null,
        // attachmentPath: (currentPath, extras) => `https://another-path/${currentPath}`,

        traceViewerUrl: 'https://trace.playwright.dev/?trace={traceUrl}',

        // logging levels: off, error, info, debug
        logging: 'info',

        // timezone offset in minutes, GMT+0800 = -480
        timezoneOffset: 0,

        // global coverage settings for addCoverageReport API
        coverage: null,
        // coverage: {
        //     entryFilter: (entry) => true,
        //     sourceFilter: (sourcePath) => sourcePath.search(/src\/.+/) !== -1,
        // },

        // trend data handler
        trend: null,
        // trend: () => './test-results/report.json',

        // custom tags style
        tags: {
          smoke: {
            style: {
              background: '#6F9913'
            },
            description: 'smoke test.'
          },
          init: {
            style: 'background:#178F43;',
            description: '初始化环境'
          },
          critical: {
            style: 'background:orange;',
            description: '关键功能'
          },
          enable: {
            style: 'background:green;',
            description: '开启'
          },
          login: {
            style: 'background:blue;',
            description: 'login the system.'
          },
          setup: {
            style: 'background:green;',
            description: '预备环境'
          },
          spark: {
            style: 'background:#FF3030;',
            description: 'Spark统一认证平台'
          },
          ccmgr: {
            style: 'background:#42D1f5;',
            description: '云管平台'
          },
          ckmgr: {
            style: 'background:#9ACD32;',
            description: '密管平台'
          },
          admin: {
            style: 'background:#F5D142;',
            description: '管理员'
          },
          tenant: {
            style: 'background:#D742F5;',
            description: '租户'
          },
        },

        // columns data handler
        //columns: null,
        // columns: (defaultColumns) => {},


        columns: (defaultColumns) => {
          // insert custom column(s) before a default column
          const index = defaultColumns.findIndex((column) => column.id === 'duration');

          defaultColumns.splice(index, 0, {
            // define the column in reporter
            id: 'owner',
            name: 'Owner',
            align: 'center',
            searchable: true,
            styleMap: {
              'font-weight': 'normal'
            }
          },


            {
              // another column for mantisBT link
              id: 'mantis',
              name: 'MantisBT',
              width: 75,
              searchable: true,
              styleMap: 'font-weight:normal;',
              /**
               * 
               * @param v Mantis ID
               * @param rowItem 
               * @param columnItem   
               * @returns a link
               */
              formatter: (v, rowItem, columnItem) => {
                const key = rowItem[columnItem.id];
                /** 目前MantisBT的BaseURL用变量的形式会导致报告出现空白的BUG */
                return `<a href="http://192.168.111.111/bt/view.php?id=${key}" target="_blank">${v}</a>`;
              }
            },
          )

          defaultColumns.push({
            id: 'description',
            name: 'Description',
            width: 110,
            markdown: true,
            searchable: true
          })

        },

        // rows data handler (suite, case and step)
        visitor: null,
        // visitor: (data, metadata, collect) => {},
        customFieldsInComments: true,
        // onEnd hook
        onEnd: null
        // onEnd: async (reportData, capability) => {}

      }]

     
    ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
   

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',

    // Whether to ignore HTTPS errors during navigation.
    ignoreHTTPSErrors: true,

    // Capture screenshot after each test failure.
    screenshot: { mode: 'only-on-failure', fullPage: true, omitBackground: true },

    locale: 'en-GB',

    //Set action a timeouts in the config
    actionTimeout: 10 * 1000,

    //Set navigation timeouts in the config
    navigationTimeout: 10 * 1000,
  },


 



  /* Configure projects for major browsers */
  projects: [
   

    {
      name: 'debug',

      use: {
        ...devices['Desktop Chrome'],

        //storageState: 'playwright/.auth/user.json',
      },
      //dependencies: ['setup'],
    },

    /** 
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

