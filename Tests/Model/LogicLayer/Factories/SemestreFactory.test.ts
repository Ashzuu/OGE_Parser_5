import { SemestreFactory } from '../../../../src/Model/LogicLayer/Factories/SemestreFactory';
import { PageParser } from '../../../../src/Model/LogicLayer/Parsing/PageParser';
import { Semestre } from '../../../../src/Model/Types/Grades/Elements/Semestre';
import { JestSetup } from '../../../Mocks/JestSetup';

JestSetup.SetupBodyElementProperty();

describe('SemestreFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            JestSetup.SetupMockBody(1);
            expect(SemestreFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllRessourceSemestre', () => {
        test('Normal Test Case', () => {
            JestSetup.SetupMockBody(1);
            expect(SemestreFactory.Instance.GetSemester()).toBeDefined();
        });
    });
});