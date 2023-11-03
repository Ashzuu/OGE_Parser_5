import { NoteFactory } from '../../../../src/Model/LogicLayer/Factories/NoteFactory';
import { PageParser } from '../../../../src/Model/LogicLayer/Parsing/PageParser';
import { Note } from '../../../../src/Model/Types/Grades/Elements/Note';

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
        test('Normal Test Case', () => {
            let result: Note[] = NoteFactory.Instance.GetAllNotes(0, 0, 1);
            expect(result).toBeDefined();
        });
    });
});