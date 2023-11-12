import { PageParser } from "../../src/Model/LogicLayer/Parsing/PageParser";
// import { Event } from 'mocks/chrome/events';

Object.defineProperty(PageParser.Instance, 'BodyElement', {
    get: jest.fn(() => document.body),
});