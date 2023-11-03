import { RessourceFactory } from '../../../../src/Model/LogicLayer/Factories/RessourceFactory';
import { PageParser } from '../../../../src/Model/LogicLayer/Parsing/PageParser';
import { ChildNotFoundError } from '../../../../src/Model/Types/Error/ChildNotFoundError';
import { TableNotFoundError } from '../../../../src/Model/Types/Error/TableNotFoundError';
import { Ressource } from '../../../../src/Model/Types/Grades/Elements/Ressource';

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

describe('RessourceFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            expect(RessourceFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllUERessources', () => {
        test('Normal Test Case', () => {
            expect(
                RessourceFactory.Instance.GetAllUERessources(0)
            ).toBeDefined();
        });
        test('Not Throwing TableNotFound', () => {
            expect(RessourceFactory.Instance.GetAllUERessources(-1));
            expect(RessourceFactory.Instance.GetAllUERessources(500));
        });
    });
});