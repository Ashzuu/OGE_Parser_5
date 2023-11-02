import { SectionFactory } from '../../../../src/Model/LogicLayer/Factories/SectionFactory';
import { PageParser } from '../../../../src/Model/LogicLayer/Parsing/PageParser';
import { ChildNotFoundError } from '../../../../src/Model/Types/Error/ChildNotFoundError';
import { TableNotFoundError } from '../../../../src/Model/Types/Error/TableNotFoundError';
import { Section } from '../../../../src/Model/Types/Grades/Elements/Section';

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

describe('SectionFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            expect(SectionFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllRessourceSection', () => {
        test('NormalTest', () => {
            let result: Section[] = SectionFactory.Instance.GetAllRessourceSection(0, 0);
            expect(result).toBeDefined();
        });
        test('TableNotFound', () => {
            expect(() => {
                SectionFactory.Instance.GetAllRessourceSection(-1, 0);
            }).toThrow(TableNotFoundError);
        });
    });
    describe('GetSection', () => {
        test('NormalTest', () => {
            let result: Section = SectionFactory.Instance.GetSection(0, 0, 0);
            expect(result).toBeDefined();
        });
        test('TableNotFound', () => {
            expect(() => {
                SectionFactory.Instance.GetSection(-1, 0, 0);
            }).toThrow(TableNotFoundError);
        });
        test('ChildNotFound', () => {
            expect(() => {
                SectionFactory.Instance.GetSection(0, 0, 50);
            }).toThrow(ChildNotFoundError);
        });
    });
});