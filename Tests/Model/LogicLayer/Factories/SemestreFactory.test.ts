import { SemestreFactory } from '../../../../src/Model/LogicLayer/Factories/SemestreFactory';
import { TestsSetup } from '../../../Mocks/TestsSetup';

TestsSetup.SetupBodyElementProperty();

describe('SemestreFactory', () => {
    describe('Instance', () => {
        test('Get', () => {
            TestsSetup.SetupMockBody(1);
            expect(SemestreFactory.Instance).toBeDefined();
        });
    });
    describe('GetAllRessourceSemestre', () => {
        test('Normal Test Case', () => {
            TestsSetup.SetupMockBody(1);
            expect(SemestreFactory.Instance.GetSemester()).toBeDefined();
        });
    });
});