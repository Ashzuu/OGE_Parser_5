import { PageParser } from "../../src/Model/LogicLayer/Parsing/PageParser";
// import { Event } from 'mocks/chrome/events';

Object.defineProperty(PageParser.Instance, 'BodyElement', {
    get: jest.fn(() => document.body),
});

//#region chrome
let localStorage = {}
const R = require('ramda');

// (chrome.storage.local as any).set =  jest.fn(async(toMergeIntoStorage: any) => localStorage = { ...localStorage, ...toMergeIntoStorage });
// (chrome.storage.local as any).get = jest.fn(async (keysToInclude: any) => { return R.pick(keysToInclude, localStorage); });

// jest.setup.ts or your test file

// Mock the chrome object
global.chrome = {
    storage: {
      local: {
        set: jest.fn((toMergeIntoStorage, callback) => {
          localStorage = { ...localStorage, ...toMergeIntoStorage };
          if (callback) callback();
        }),
        get: jest.fn((keysToInclude, callback) => {
          const items = R.pick(keysToInclude, localStorage);
          if (callback) callback(items);
          return Promise.resolve(items);
        }),
        // Add other methods you need to mock here
      },
    },
    // Mock other chrome APIs if needed
  } as any;
  
  // You might need to declare the global variable if TypeScript complains about it
  declare var chrome: any;
  
//#endregion chrome