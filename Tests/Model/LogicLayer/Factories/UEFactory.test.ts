import { UEFactory } from '../../../../src/Model/LogicLayer/Factories/UEFactory';
import { PageParser } from '../../../../src/Model/LogicLayer/Parsing/PageParser';
import { ChildNotFoundError } from '../../../../src/Model/Types/Error/ChildNotFoundError';
import { TableNotFoundError } from '../../../../src/Model/Types/Error/TableNotFoundError';
import { UE } from '../../../../src/Model/Types/Grades/Elements/UE';

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

describe('UEFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            expect(UEFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllRessourceUE', () => {
        test('Normal Test Case', () => {
            expect(UEFactory.Instance.GetAllUEs()).toBeDefined();
        });
    });
});