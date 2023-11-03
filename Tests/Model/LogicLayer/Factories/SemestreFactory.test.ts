import { SemestreFactory } from '../../../../src/Model/LogicLayer/Factories/SemestreFactory';
import { PageParser } from '../../../../src/Model/LogicLayer/Parsing/PageParser';
import { Semestre } from '../../../../src/Model/Types/Grades/Elements/Semestre';

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

describe('SemestreFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            expect(SemestreFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllRessourceSemestre', () => {
        test('Normal Test Case', () => {
            expect(SemestreFactory.Instance.GetSemester()).toBeDefined();
        });
    });
});