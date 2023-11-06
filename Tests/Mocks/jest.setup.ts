// import './jest.global';
// import { PageParser } from "../../src/Model/LogicLayer/Parsing/PageParser";

// const storedValues: { [id: string]: any } = {};

// export const chromeMock = {
//     storage: {
//         local: {
//             get: jest.fn((keys, callback) => {
//                 const items: any = {};
//                 if (!Array.isArray(keys)) {
//                     keys = [keys];
//                 }
//                 keys.forEach((key: string) => {
//                     items[key] = storedValues[key];
//                 });
//                 process.nextTick(() => {
//                     callback(items);
//                 });
//             }),
//             set: jest.fn((items, callback) => {
//                 Object.keys(items).forEach((key) => {
//                     storedValues[key] = items[key];
//                 });
//                 if (callback) {
//                     process.nextTick(() => {
//                         callback();
//                     });
//                 }
//             }),
//         },
//     },
//     runtime: {
//         lastError: null,
//     },
// };


// global.chrome = chromeMock;

// Object.defineProperty(PageParser.Instance, 'BodyElement', {
//     get: jest.fn(() => document.body),
// });