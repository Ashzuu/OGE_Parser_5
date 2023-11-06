import { SectionFactory } from '../../../../src/Model/LogicLayer/Factories/SectionFactory';
import { PageParser } from '../../../../src/Model/LogicLayer/Parsing/PageParser';
import { ChildNotFoundError } from '../../../../src/Model/Types/Error/ChildNotFoundError';
import { TableNotFoundError } from '../../../../src/Model/Types/Error/TableNotFoundError';
import { Section } from '../../../../src/Model/Types/Grades/Elements/Section';
import { TestsSetup } from '../../../Mocks/TestsSetup';

TestsSetup.SetupBodyElementProperty();

describe('SectionFactory', () => {
    describe('Instance', () => {
        TestsSetup.SetupMockBody(1);
        test('Get', () => {
            expect(SectionFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllRessourceSection', () => {
        test('Normal Test Case', () => {
            TestsSetup.SetupMockBody(1);
            let result: Section[] = SectionFactory.Instance.GetAllRessourceSection(0, 0);
            expect(result.length).toBe(3);

            let testedSection: Section = result[2];
            expect(testedSection.Average).toBe(12);
            expect(testedSection.Coefficient).toBe(1);
        });
        test('Not Throwing TableNotFound', () => {
            TestsSetup.SetupMockBody(1);
            expect(SectionFactory.Instance.GetAllRessourceSection(-1, 0));
            expect(SectionFactory.Instance.GetAllRessourceSection(500, 0));
        });
    });
});