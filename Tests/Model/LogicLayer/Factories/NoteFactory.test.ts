import { NoteFactory } from '../../../../src/Model/LogicLayer/Factories/NoteFactory';
import { PageParser } from '../../../../src/Model/LogicLayer/Parsing/PageParser';
import { Test_BodyElement } from '../../htmlBody.test';
import { JSDOM } from 'jsdom';

const fs = require('fs');
const path = require('path');

let mockHtml: string;
const PATH_TO_MOCKS: string = `C:/Users/ashot/Documents/GitHub/OGE_Parser/Tests/Mocks/`;

beforeAll(() => {
    mockHtml = fs.readFileSync(path.resolve(PATH_TO_MOCKS, 'OGE.HTML'), 'utf-8');
    Object.defineProperty(PageParser.Instance, 'BodyElement', {
        get: jest.fn(() => document.body),
    });
});

beforeEach(() => {
    document.body.innerHTML = mockHtml;
});

describe('NoteFactory', () => {

    describe('Instance', () => {
        test('Get', () => {
            expect(NoteFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllNotes', () => {
        test('GetAllNotes', () => {
            // try{
                expect(NoteFactory.Instance.GetAllNotes(0, 0, 1)).toBeDefined();
            // }
            // catch (e){}
        });
    });
});